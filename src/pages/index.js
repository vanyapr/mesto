//ИМПОРТ CSS (для сборки проекта)
import './index.css';

//ИМПОРТ ПЕРЕМЕННЫХ
import {
  token,
  cohort,
  editProfile,
  userNameSelector,
  userInformationSelector,
  userAvatarSelector,
  profilePopupSelector,
  profileName,
  profileDescription,
  addPlaceButton,
  placeTemplate,
  placesListContainerSelector,
  addPlacePopupSelector,
  imagePopupSelector,
  confirmCardDeleteButton,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikeButtonSelector,
  cardLikeActiveClass,
  cardLikeCounterSelector,
  cardDeleteButtonSelector,
  validationSettings
} from '../utils/constants.js';

//ИМПОРТ КЛАССОВ
import Card from '../components/Card.js'; //Импортируем класс карточки
import FormValidator from '../components/FormValidator.js'; //Импортируем класс валидатора
import Section from '../components/Section.js'; //Импортируем класс рендера элементов
import Popup from '../components/Popup.js'; //Импортируем класс попапа
import PopupWithImage from '../components/PopupWithImage.js'; //Импортируем класс попапа c изображением
import PopupWithForm from '../components/PopupWithForm.js'; //Импортируем класс попапа c формами
// import PopupWithConfirmButton from '../components/PopupWithConfirmButton.js'; //Импортируем класс попапа c кнопкой подтверждения
import UserInfo from '../components/UserInfo.js'; //Импортируем класс данных пользователя
import Api from '../components/Api.js'; //Импортируем класс АПИ

//ПРОФИЛЬ ЮЗЕРА
//Селекторы профиля пользователя
const userProfile = {
  userNameSelector, //Селектор имени пользователя
  userInformationSelector, //Селектор описания пользователя
  userAvatarSelector //Селектор аватара пользователя
}

//Профиль пользователя
const userInformation = new UserInfo(userProfile);

// Подключение профиля пользователя к АПИ
const user = new Api(
  {
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}/users/me`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  }
);

// Получаем данные пользователя по апи при загрузке страницы
user.getData()
  .then(json => {
    //Распишу переменные чтобы код было проще читать:
    const userName = json.name;
    const about = json.about;
    const avatar = json.avatar
    userInformation.setUserInfo(userName, about, avatar); //Записываем данные в профиль пользователя
  }) //Присваиваем данные пользователя
  .catch(error => console.log(error)) //Пока что выведем ошибки в консоль;

//Листенер кнопки редактирования профиля
editProfile.addEventListener('click', () => {
  editProfilePopup.open(); //Открыть попап редактирования профиля
  const userData = userInformation.getUserInfo(); //Получаем объект с данными пользователя
  //Записываем данные в поля формы
  profileName.value = userData.userName;
  profileDescription.value = userData.userInformation;
});

//Коллбэк сабмита данных в попапе с данными профиля
const profileFormSubmitHandler = formValues => {
  //Мы записываем их в профиль пользователя
  const profileName = formValues.profileName; //Достали имя из объекта
  const profileDescription = formValues.profileDescription; //Достали описание из объекта
  const userData = {
    name: profileName,
    about: profileDescription
  }
  user.saveData(userData);
  userInformation.setUserInfo(profileName, profileDescription); //Записали данные в профиль
}

//Попап редактирования профиля
const editProfilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);

//ПОПАП С КАРТИНКОЙ
//Попап с картинкой
const imagePopup = new PopupWithImage(imagePopupSelector);

//Коллбэк открытия попапа кликом на изображение в карточке
const handleCardClick = (imageUrl, imageText) =>  {
  imagePopup.open(imageUrl, imageText);//Заполняем данные попапа
};

//При загрузке страницы добавляем места внутрь списка мест с использованием темплейта
//Функция обратного вызова, возвращает DOM элемент рендера карточки места, должна быть в коде ниже коллбэка, чтобы корректно работала карточка места
const renderer = (item, containerSelector) => {
  const card = new Card(item.name, item.link, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, cardLikeCounterSelector, item.likes.length , handleCardClick, handleCardDelete);
  const renderedCard = card.render(); //Хочу оставить переменную для читаемости кода
  const container = document.querySelector(containerSelector);
  container.append(renderedCard);
}

//Объявление экземпляра класса Section для рендера элементов на странице
const placeContainer = new Section(
  renderer , //Функция обратного вызова
  placesListContainerSelector //Селектор списка мест (контейнера)
);

//Загрузка карточек с сервера
const cards = new Api(
  {
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}/cards`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  }
);

//Получаем данные карточек
cards.getData().then(cardsList => {
  //После чего каждую карточку отрендерим на странице
  placeContainer.renderElements(cardsList);//Рендер всех карточек на странице
}).catch(error => console.log(error)); //Отловим ошибки рендера в консоли

//Коллбэк сабмита данных в попапе с данными места
const placeFormSubmitHandler = formValues => {
    const placeName = formValues.placeName;
    const placeImage = formValues.placeImage;
    const placeData = {
      name: placeName,
      link: placeImage
    }
    cards.addData(placeData);
    const newPlace = new Card(placeName, placeImage, placeTemplate, cardSelector, cardImageSelector, cardTitleSelector, cardLikeButtonSelector, cardLikeActiveClass, cardDeleteButtonSelector, cardLikeCounterSelector, 0 , handleCardClick, handleCardDelete);
    const renderedPlace = newPlace.render(); //Рендерим новую карточку
    placeContainer.addItem(renderedPlace); //Добавляем на страницу
}

//Попап добавления нового места
const newPlacePopup = new PopupWithForm(addPlacePopupSelector, placeFormSubmitHandler);

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

//ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
//Попап подтверждения удаления карточки места
//FIXME: Вынести селектор попапа с кнопкой в переменные
const deleteConfirmationPopup = new Popup('.popup_type_confirm');

//Коллбэк подтверждения удаления карточки места
const handleCardDelete = event => {
  const card = event.target.closest(cardSelector); //Вычисляем карточку, которую надо удалить
  const confirmPopup = document.querySelector('.popup_type_confirm'); //Нам понадобится селектор попапа
  deleteConfirmationPopup.open(); //Открываем попап и передать туда карточку места и кнопку подтверждения

  // Объявим листенер: поскольку у нас при открытии попапа вешается листенер на кнопку, нам надо его снимать при закрытии попапа
  const listener = function (event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      //По клику на кнопку закрытия или по карточке попапа мы также удаляем листенер
      confirmPopup.removeEventListener('click', listener);
    } else if (event.target === confirmCardDeleteButton) {
      card.remove(); //Удалили карточку
      deleteConfirmationPopup.close(); //Закрыли попап
      confirmPopup.removeEventListener('click', listener); //Удалили листенер
    }
  };

  //При открытии попапа вешаем листенер на нажатие кнопки "ок"
  confirmPopup.addEventListener('click', listener);
}




// 1) Получаем айди пользователя
// 2) Передаем айди пользователя в рендер карточки
// 3) Передать айди пользователя из карточки
// 4) Сравнить айди и в случае совпадения добавить кнопку удаления
