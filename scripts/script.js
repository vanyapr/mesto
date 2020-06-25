// РАБОТА С ПОП-АПОМ ПРОФИЛЯ
// Кнопка редактирования профиля
const editProfile = document.querySelector('.profile__edit-button');
// Кнопка закрытия поп-апа
const closePopup = document.querySelectorAll('.form__close');
// Сам поп-ап
const profilePopup = document.querySelector('.popup');

// Функция открытия попапа (принимает объект - попап) переключает его класс
const togglePopup = (target) => {
  //Если у поп-апа нет класса "popup_opened", мы его добавляем по клику, иначе убираем этот класс
  target.classList.toggle('popup_opened');
}

//Закрываем форму по клику на кнопку закрытия (сработает для всех форм, которые будут добавляться на страницу в будущем)
closePopup.forEach((item) => {
  item.addEventListener('click', (event) => {
    togglePopup(event.target.closest('.popup'));
  });
});

//Функция редактирования профиля: счиывает и сохраняет значения
const toggleProfilePopup = () => {
  // Считываем значения из документа и записываем их в поля формы при открытии формы
  formName.value = name.textContent;
  formDescription.value = description.textContent;

  togglePopup(profilePopup);
}

// Открываем профиль по клику на кнопку редактирования профиля
editProfile.addEventListener('click', toggleProfilePopup);

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const name = document.querySelector('.profile__title'); // Имя в профиле на странице
const description = document.querySelector('.profile__description'); // Род деятельности в профиле на странице
const formProfile = document.querySelector('.form-profile'); // Форма с полями
const formName = document.querySelector('.form__input_value_name'); // Имя в форме
const formDescription = document.querySelector('.form__input_value_description'); // Род деятельности в форме

// Если форма была отправлена, перезаписываем значения в профиле
const profileFormSubmitHandler = (event) => {
  //Отменяем действие формы по умолчанию
  event.preventDefault();
  //Записываем значения из формы в документ
  name.textContent = formName.value;
  description.textContent = formDescription.value;

  //Не забываем закрыть форму
  togglePopup(profilePopup);
}

//Отслиживаем форм сабмит для формы редактирования профиля
formProfile.addEventListener('submit', profileFormSubmitHandler);

//Проектная работа номер 4
//Список карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

//Определяем теплейт и котейнер списка мест
const placesTemplate = document.querySelector('#place-template').content;
const placesContainer = document.querySelector('.places__list');

//Функция формирования карточки места, принимает объект
const renderPlace = object => {
  const renderTemplate = placesTemplate.cloneNode(true); //Клонируем темплейт
  renderTemplate.querySelector('.place__title').textContent = object.name; //Выставляем название
  renderTemplate.querySelector('.place__image').src = object.link; //Выставляем изображение

  //Добавить событие на лайк
  renderTemplate.querySelector('.place__like').addEventListener('click', event => {
    event.target.classList.toggle('place__like_status_active');
  });

  //Добавить событие на удаление места
  renderTemplate.querySelector('.place__delete').addEventListener('click',  event => event.target.closest('.place').remove());

  return renderTemplate; //Возвращаем готовый темплейт
}

//При загрузке страницы отрисовываем карточки внутри контейнере
initialCards.forEach(item => placesContainer.append(renderPlace(item)));

//Добавление нового места
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопка добавления
const addPlacePopup = document.querySelector('.popup-place'); //Всплывающее окно
const placeName = document.querySelector('.form__input_value_place-name'); //Название места в форме
const placeImage = document.querySelector('.form__input_value_image'); //Ссылка на изображение в форме
const formPlace = document.querySelector('.form-profile'); //Форма с данными о месте

//Когда нажимаем на кнопку добавления места
addPlaceButton.addEventListener('click', () => {
  //Обнуляем значения формы
  // placeName.value = '';
  // placeImage.value = '';
  //Добавляем класс "открыто"

  togglePopup(addPlacePopup);
});



//const

//Всплывающее окно с изображением
