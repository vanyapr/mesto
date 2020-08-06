//Импортирование CSS
// import './index.css';

// ИМПОРТ КЛАССОВ
import Card from '../components/Card.js'; //Импортируем класс карточки
import FormValidator from '../components/FormValidator.js'; //Импортируем класс валидатора
import Section from '../components/Section.js'; //Импортируем класс рендера элементов
import Popup from '../components/Popup.js'; //Импортируем класс попапа
import PopupWithImage from '../components/PopupWithImage.js'; //Импортируем класс попапа c изображением

//TODO:
// 0) Удалить неиспользуемые переменные
// 1) Перенести переменные в файл constants.js в папке utils.
// ПЕРЕМЕННЫЕ
// Редактирование профиля пользователя
const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupList = document.querySelectorAll('.popup'); // Список попапов в документе
const userTitle = document.querySelector('.profile__title'); // Имя в профиле на странице
const userDescription = document.querySelector('.profile__description'); // Род деятельности в профиле на странице

// Форма редактирования профиля пользователя
const formProfile = document.forms.formProfile; // Форма с полями
const profilePopup = document.querySelector('.popup-profile'); // Всплывающее окно редактирования профиля юзера
const profileName = formProfile.profileName; // Имя в форме
const profileDescription = formProfile.profileDescription; // Род деятельности в форме

// Добавление нового места
const addPlaceButton = document.querySelector('.profile__add-button'); // Кнопка добавления нового места
const placeTemplate = document.querySelector('#place-template').content; // Теплейт одного места в списке мест
const placesListContainerSelector = '.places__list'; // Селектор контейнера, в котором будем рендерить список мест

// Форма добавления нового места
const formPlace = document.forms.formPlace; // Форма с данными о месте
const addPlacePopup = document.querySelector('.popup-place'); // Всплывающее окно добавления нового места
const placeName = formPlace.placeName; // Название места в форме
const placeImage = formPlace.placeImage; // Ссылка на изображение в форме

// Всплывающее окно с изображением
// const imagePopup = document.querySelector('.image-popup'); //Попап с изображением
//const popupImage = imagePopup.querySelector('.popup__image'); //Изображение в попапе
//const popupImageTitle = imagePopup.querySelector('.popup__image-description'); //Текст описания изображения в попапе
const popupOpenedClass = 'popup_opened'; //Класс открытого попапа для передачи в функции

//Селекторы и классы карточки места для использования в классе
const cardSelector = '.place';
const cardImageSelector = '.place__image';
const cardTitleSelector = '.place__title';
const cardLikeButtonSelector = '.place__like';
const cardLikeActiveClass = 'place__like_status_active';
const cardDeleteButtonSelector = '.place__delete';


//Объект с данными для списка мест
const initialCards = [
  {
    name: 'Москва',
    link: 'https://kudamoscow.ru/uploads/e6e9e1d7c7ba9638527087eac4aa39b3.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationSettings = {
  formSelector: '.form', //Не используется, нужен ли он?
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};


//ОСНОВНОЙ КОД
//Инициализация попапов
//Инициализация попапов на странице
const imagePopup = new PopupWithImage('.popup_type_image');
//console.log(imagePopup);
//imagePopup.open('https://yandex.ru/images/search?pos=0&from=tabbar&img_url=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJyCu8iRYl_bLGCOiob3G8R_FZ8iBANSuiR9laVe%3Ds900-c-k-c0xffffffff-no-rj-mo&text=favicon+ico+generator+online&rpt=simage', 'vasya');

//Коллбэк открытия попапа кликом на изображение в карточке
const handleCardClick = (imageUrl, imageText) =>  {
  imagePopup.setEventListeners();
  imagePopup.open(imageUrl, imageText);
};

//Попап с информацией профиля
const editProfilePopup = new Popup('.popup-profile');
editProfilePopup.setEventListeners(); //Включение листенеров
//editProfilePopup.open(); //Открытие попапа с картинкой

//При загрузке страницы добавляем места внутрь списка мест с использованием темплейта
//Функция обратного вызова, возвращает DOM элемент рендера карточки места
const renderer = (item) => {
  const card = new Card(item.name, item.link, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, handleCardClick);
  const renderedCard = card.render(); //Хочу оставить переменную для читаемости кода
  return renderedCard;
}

//Объявление экземпляра класса Section
const placeContainer = new Section(
  {
    items: initialCards, //Список карточек для рендера
    renderer //Функция обратного вызова
  }, placesListContainerSelector //Селектор списка мест (контейнера)
);

//Рендер всех карточек на странице
placeContainer.renderElements();






//Включаем валидацию для всех форм документа
Array.from(document.forms).forEach(form => {
  //Объявляем экземпляр класса
  const validateForm = new FormValidator(validationSettings, form);
  //Для каждой формы активируем валидацию
  validateForm.enableValidation();
});


//Коллбэк листенера кнопки эскейп для вызова в функции открытия попапа
// const escapeListener = (event) => {
//   //Поскольку листенер мы повесили на документ, надо дополнительно найти попап, который открыт
//   const targetPopup = document.querySelector(`.${popupOpenedClass}`);
//
//   //Отловить нажатие кнопки эскейп
//   if(event.key === 'Escape') {
//     //Закрыть попап
//     togglePopup(targetPopup);
//   }
// };


// Функция открытия попапа (принимает объект - попап) переключает его класс (открыт/закрыт)
// Рефактор: также добавляет эвент листенеры при открытии и закрытии попапа
// const togglePopup = target => {
//   // Если у объекта нет класса "popup_opened", мы его добавляем по клику, иначе убираем класс "popup_opened"
//   target.classList.toggle(popupOpenedClass);
//
//   //Если объект открыт
//   if (target.classList.contains(popupOpenedClass)) {
//     //добавляем листенер
//     document.addEventListener('keydown', escapeListener);
//   } else {
//     //иначе удаляем листенер
//     document.removeEventListener('keydown', escapeListener);
//   }
// };


// ~~Закрываем попап по клику на кнопку закрытия (сработает для всех форм, которые будут добавляться на страницу в будущем)~~
// Рефактор: событие теперь вешается не на кнопку закрытия попапа, а на весь попап, где вызывается для нужного элемента всплытием
// popupList.forEach((popup) => {
//   popup.addEventListener('click', (event) => {
//     // Проверяем, является ли целью клика нужный нам элемент
//     if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
//       //Вызываем событие всплытием
//       togglePopup(event.target.closest('.popup'));
//     }
//   });
// });


//Открытие окна редактирования профиля: считываем значения из документа и вносим в поля формы
// const toggleProfilePopup = () => {
//   // Считываем значения из документа и записываем их в поля формы при открытии формы
//   profileName.value = userTitle.textContent;
//   profileDescription.value = userDescription.textContent;
//   togglePopup(profilePopup); //Открываем попап
// };

// Добавляем событие на открытие формы редактирования профиля по клику на кнопку редактирования профиля
// editProfile.addEventListener('click', toggleProfilePopup);


// Отправка формы редактирования профиля пользователя
// const profileFormSubmitHandler = event => {
//   //Отменяем действие формы по умолчанию
//   event.preventDefault();
//
//   //Записываем значения из формы в элементы документа
//   userTitle.textContent = profileName.value;
//   userDescription.textContent = profileDescription.value;
//
//   //Не забываем закрыть форму
//   togglePopup(profilePopup);
// }
//
// //Отслиживаем форм сабмит для формы редактирования профиля пользователя
// formProfile.addEventListener('submit', profileFormSubmitHandler);


//Обработчик нажатия на кнопку добавления места, открывает форму добавления места
// addPlaceButton.addEventListener('click', () => {
//   //Обнуляем значения формы перед её отображением
//   placeName.value = '';
//   placeImage.value = '';
//
//   //Добавляем класс "открыто" форме добавления места
//   togglePopup(addPlacePopup);
// });


//Функция обработчик события отправки формы добавления нового места
// const placeFormSubmitHandler = event => {
//   //Мы отменяем дефолтное действие формы (отправку гет запроса)
//   event.preventDefault();
//
//   //Проверим поля на предмет ввода данных перед отправкой формы, ну мало ли что
//   if (placeName.value !== '' && placeImage.value !== '') {
//     //Создаем объект с параметрами, которые получили из формы
//     const formSubmitResult = {}; //Объявили пустой объект (через const потому что попросил ревьюер, никак не привыкну что у констант можно перезаписывать значения свойств)
//     formSubmitResult.name = placeName.value; //Записали имя из формы
//     formSubmitResult.link = placeImage.value; //Записали ссылку на картинку из формы
//
//     //Потом создаем новый объект места
//     const card = new Card(placeName.value, placeImage.value, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, imagePopup, popupImage, popupImageTitle, popupOpenedClass);
//     const place = card.render();
//     //Используем метод добавления события на страницу
//     placesListContainer.append(place);
//
//     //И закрываем форму
//     togglePopup(addPlacePopup);
//   } else {
//     //Если поля пустые, выведем в консоль, ведь дизайнер не дал нам состояния инпутов
//     // при отсутствии данных, а пустой сабмит сломает верстку.
//     // console.log('Данные заполнены не полностью!!!');
//   }
// }
//
// //Инициализируем события при отправке формы добавления места
// formPlace.addEventListener('submit', placeFormSubmitHandler);