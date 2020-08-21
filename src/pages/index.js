//ИМПОРТ CSS (для сборки проекта)
import './index.css';

//ИМПОРТ ПЕРЕМЕННЫХ
import {
  token,
  cohort,
  editProfile,
  userNameSelector,
  userInformationSelector,
  profilePopupSelector,
  profileName,
  profileDescription,
  addPlaceButton,
  placeTemplate,
  placesListContainerSelector,
  addPlacePopupSelector,
  imagePopupSelector,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikeButtonSelector,
  cardLikeActiveClass,
  cardDeleteButtonSelector,
  initialCards,
  validationSettings
} from '../utils/constants.js';

//ИМПОРТ КЛАССОВ
import Card from '../components/Card.js'; //Импортируем класс карточки
import FormValidator from '../components/FormValidator.js'; //Импортируем класс валидатора
import Section from '../components/Section.js'; //Импортируем класс рендера элементов
import Popup from '../components/Popup.js'; //Импортируем класс попапа
import PopupWithImage from '../components/PopupWithImage.js'; //Импортируем класс попапа c изображением
import PopupWithForm from '../components/PopupWithForm.js'; //Импортируем класс попапа c формами
import UserInfo from '../components/UserInfo.js'; //Импортируем класс данных пользователя
import Api from '../components/Api.js'; //Импортируем класс АПИ

//ОСНОВНОЙ КОД
//Объект с информацией о пользователе
const user = {
  userNameSelector, //Селектор имени пользователя
  userInformationSelector //Селектор описания пользователя
}

//Объявляем экземпляр передавая настойки объектом
const userInformation = new UserInfo(user);

//Вешаем листенер на кнопку редактирования профиля
editProfile.addEventListener('click', () => {
  editProfilePopup.open(); //Открыть попап редактирования профиля
  const userData = userInformation.getUserInfo(); //Получаем объект с данными пользователя
  //Записываем данные в поля формы
  profileName.value = userData.userName;
  profileDescription.value = userData.userInformation;
});

//Попап с картинкой
const imagePopup = new PopupWithImage(imagePopupSelector);

//Коллбэк открытия попапа кликом на изображение в карточке
const handleCardClick = (imageUrl, imageText) =>  {
  imagePopup.setEventListeners(); //Инициализируем эвент листенеры
  imagePopup.open(imageUrl, imageText);//Заполняем данные попапа
};

//При загрузке страницы добавляем места внутрь списка мест с использованием темплейта
//Функция обратного вызова, возвращает DOM элемент рендера карточки места, должна быть ниже коллбэка, чтобы корректно работала карточка места
const renderer = (item, containerSelector) => {
  const card = new Card(item.name, item.link, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, handleCardClick);
  const renderedCard = card.render(); //Хочу оставить переменную для читаемости кода
  const container = document.querySelector(containerSelector);
  container.append(renderedCard);
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

//Коллбэк сабмита данных в попапе с данными профиля
const profileFormSubmitHandler = formValues => {
  //Мы записываем их в профиль пользователя
  const profileName = formValues.profileName; //Достали имя из объекта
  const profileDescription = formValues.profileDescription; //Достали описание из объекта
  userInformation.setUserInfo(profileName, profileDescription); //Записали данные в профиль
}

//Коллбэк сабмита данных в попапе с данными места
const placeFormSubmitHandler = formValues => {
    const placeName = formValues.placeName;
    const placeImage = formValues.placeImage;
    const newPlace = new Card(placeName, placeImage, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, handleCardClick);
    const renderedPlace = newPlace.render(); //Рендерим новую карточку
    placeContainer.addItem(renderedPlace); //Добавляем на страницу
}

//Попап редактирования профиля
const editProfilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);
editProfilePopup.setEventListeners(); //Включение листенеров

//Попап добавления нового места
const newPlacePopup = new PopupWithForm(addPlacePopupSelector, placeFormSubmitHandler);
newPlacePopup.setEventListeners();

//Вешаем листенер на кнопку добавления нового места
addPlaceButton.addEventListener('click', () => {
  newPlacePopup.open(); //Открываем форму добавления места
});

//Включаем валидацию для всех форм документа
Array.from(document.forms).forEach(form => {
  //Объявляем экземпляр класса
  const validateForm = new FormValidator(validationSettings, form);
  //Для каждой формы активируем валидацию
  validateForm.enableValidation();
});

//Объявляем экземпляр АПИ
const usr = new Api(
    {
      baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}/users/me`,
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    }
  );

usr.getData();

// const cards = new Api(
//   {
//     baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}/cards`,
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     }
//   }
// );
