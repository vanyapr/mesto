//ИМПОРТ CSS (для сборки проекта)
import './index.css';

//ИМПОРТ ПЕРЕМЕННЫХ
import {
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

//Коллбэк сабмита данных в попапе с формой
const formSubmitHandler = formValues => {
  //Если поля формы содержать данные профиля пользователя
  if (formValues.profileName && formValues.profileDescription) {
    //Мы записываем их в профиль пользователя
    const profileName = formValues.profileName; //Достали имя из объекта
    const profileDescription = formValues.profileDescription; //Достали описание из объекта

    userInformation.setUserInfo(profileName, profileDescription); //Записали данные в профиль
  } else if (formValues.placeName && formValues.placeImage){ //Если поля формы содержат данные картинки,
    //Мы создаем и рендерим новую карточку места
    const placeName = formValues.placeName;
    const placeImage = formValues.placeImage;
    const newPlace = new Card(placeName, placeImage, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, handleCardClick);
    const renderedPlace = newPlace.render(); //Рендерим новую карточку
    placeContainer.addItem(renderedPlace); //Добавляем на страницу
  } else {
    //Либо мы ничего не делаем, если получен другой объект
  }
}

//Попап редактирования профиля
const editProfilePopup = new PopupWithForm(profilePopupSelector, formSubmitHandler);
editProfilePopup.setEventListeners(); //Включение листенеров

//Попап добавления нового места
const newPlacePopup = new PopupWithForm(addPlacePopupSelector, formSubmitHandler);
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
