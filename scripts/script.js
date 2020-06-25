// РАБОТА С ПОП-АПОМ ПРОФИЛЯ
const editProfile = document.querySelector('.profile__edit-button');// Кнопка редактирования профиля
const closePopup = document.querySelectorAll('.popup__close');// Кнопка закрытия поп-апа
const profilePopup = document.querySelector('.popup-profile'); // Сам поп-ап

// Функция открытия попапа (принимает объект - попап) переключает его класс
const togglePopup = target => {
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
const profileFormSubmitHandler = event => {
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

//Определяем теплейт и котейнер списка мест и попапа с картинками
const placesTemplate = document.querySelector('#place-template').content;
const placesContainer = document.querySelector('.places__list');

//Всплывающее окно с изображением
const root = document.querySelector('.root'); //Мы будем рендерить окно с изображением в конце документа, поэтому нужно определить документ
const imagePopup = document.querySelector('#image-popup-template').content; //Темплейт для реднера окна превью изображения

//Возвращаем шаблон просмотра большого изображения
const renderImagePopup = (imageUrl, imageName) => {
  const renderTemplate = imagePopup.cloneNode(true);
  renderTemplate.querySelector('.popup__image').src = imageUrl;
  renderTemplate.querySelector('.popup__image').alt = imageName;
  renderTemplate.querySelector('.popup__image-description').textContent = imageName;

  //По закрытию окна просмотра удаляем объект окно
  renderTemplate.querySelector('.popup__close').addEventListener('click', (event) => {
    let popup = event.target.closest('.popup');
    //После скрытия окна, удаляем элемент просмотра из DOM, даже хз как это сделать без пайпа
    // Чтобы попап красиво пропадал, добавил анимацию
    togglePopup(popup);
    popup.remove();
  })

  return renderTemplate;
}

//Функция формирования карточки места, принимает объект, возвращает карточку места
const renderPlace = object => {
  const renderTemplate = placesTemplate.cloneNode(true); //Клонируем темплейт
  renderTemplate.querySelector('.place__title').textContent = object.name; //Выставляем название
  renderTemplate.querySelector('.place__image').src = object.link; //Выставляем изображение
  renderTemplate.querySelector('.place__image').alt = object.name; //Выставляем альтернативный текст

  //Добавить событие на лайк
  renderTemplate.querySelector('.place__like').addEventListener('click', event => {
    event.target.classList.toggle('place__like_status_active');
  });

  //Добавить событие на удаление места
  renderTemplate.querySelector('.place__delete').addEventListener('click',  event => event.target.closest('.place').remove());

  //Добавить событие на открытие попапа
  renderTemplate.querySelector('.place__image').addEventListener('click', (event) => {
    //Получаем шаблон для рендера
    let popup = renderImagePopup(object.link, object.name);
    //Добавляем рендер в документ
    root.append(popup);
    //Находим рендер в документе b и показываем
    let renderComplete = document.querySelector('.image-popup');
    togglePopup(renderComplete);
  })

  return renderTemplate; //Возвращаем готовый темплейт
}

//При загрузке страницы отрисовываем карточки внутри контейнере
initialCards.forEach(item => placesContainer.append(renderPlace(item)));

//Добавление нового места
const addPlaceButton = document.querySelector('.profile__add-button'); //Кнопка добавления
const addPlacePopup = document.querySelector('.popup-place'); //Всплывающее окно
const placeName = document.querySelector('.form__input_value_place-name'); //Название места в форме
const placeImage = document.querySelector('.form__input_value_image'); //Ссылка на изображение в форме
const formPlace = document.querySelector('.form-place'); //Форма с данными о месте

//Когда нажимаем на кнопку добавления места
addPlaceButton.addEventListener('click', () => {
  //Обнуляем значения формы при открытии
  placeName.value = '';
  placeImage.value = '';

  //Добавляем класс "открыто"
  togglePopup(addPlacePopup);
});

//Когда юзер сабмитит форму
const placeFormSubmitHandler = event => {
  //Мы отменяем дефолтное действие формы
  event.preventDefault();

  //Проверим поля на предмет ввода данных перед отправкой формы
  if (placeName.value !== '' && placeImage.value !== '') {
    //Создаем объект с параметрами, которые получили из формы
    let formSubmitResult = {}; //Объявили пустой объект (через let потому что можем)
    formSubmitResult.name = placeName.value; //Записали имя из формы
    formSubmitResult.link = placeImage.value; //Записали ссылку на картинку из формы
    console.log(formSubmitResult);

    //Потом используем метод добавления события на страницу
    placesContainer.append(renderPlace(formSubmitResult));
    togglePopup(addPlacePopup);
  } else {
    //Если поля пустые, выведем в консоль, ведь дизайнер не дал нам состояния инпутов
    // при отсутствии данных, а пустой сабмит сломает верстку.
    console.log('Данные заполнены не полностью!!!');
  }
}

formPlace.addEventListener('submit', placeFormSubmitHandler);



