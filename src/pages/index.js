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
  deleteConfirmationPopupSelector,
  confirmCardDeleteButton,
  userAvatarPopupSelector,
  userAvatar,
  userAvatarInput,
  cardSelector,
  cardLikeActiveClass,
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

//Объявили АПИ
const api = new Api(token, cohort);

//ПРОФИЛЬ ЮЗЕРА
//Селекторы профиля пользователя
const userProfile = {
  userNameSelector, //Селектор имени пользователя
  userInformationSelector, //Селектор описания пользователя
  userAvatarSelector //Селектор аватара пользователя
}


//Профиль пользователя
const userInformation = new UserInfo(userProfile);

let userId = ''; //Переменная для хранения идентификатора юзера

// Получаем данные пользователя по апи при загрузке страницы
api.getUserInfo()
  .then(userData => {
    const {name, about , avatar} = userData;
    userId = userData._id;
    userInformation.setUserInfo(name, about, avatar); //Записываем данные в профиль пользователя
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
  const name = formValues.profileName; //Достали имя из объекта
  const about = formValues.profileDescription; //Достали описание из объекта

  //Собираем объект для сохранения
  const userData = {name, about};

  //Чтобы корректно срабатывала цепочка событий, мы используем промис
  return api.saveUserInfo(userData).then(responce => {
    userInformation.setUserInfo(responce.name, responce.about); //Записали данные в профиль
  }).catch(error => console.log(error));
}

//Попап редактирования профиля
const editProfilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);

//ПОПАП С КАРТИНКОЙ
const imagePopup = new PopupWithImage(imagePopupSelector);

//Коллбэк открытия попапа кликом на изображение в карточке
const handleCardImageClick = (imageUrl, imageText) =>  {
  imagePopup.open(imageUrl, imageText);//Заполняем данные попапа
};


//РЕНДЕР КАРТОЧЕК
//Рендерер, возвращает DOM элемент рендера карточки места, должна быть в коде ниже коллбэка, чтобы корректно работала карточка места
const renderer = (cardObject, containerSelector) => {
  const card = new Card(cardObject, userId, placeTemplate, handleCardImageClick, cardDeleteHandler, handleLikeButtonPress);
  const renderedCard = card.render(); //Хочу оставить переменную для читаемости кода
  const container = document.querySelector(containerSelector);
  container.append(renderedCard);
}

//Объявление экземпляра класса Section для рендера элементов на странице
const placeContainer = new Section(
  renderer , //Функция обратного вызова
  placesListContainerSelector //Селектор списка мест (контейнера)
);

//Получаем данные карточек
api.getCardsList().then(cardsList => {
  //После чего каждую карточку отрендерим на странице
  placeContainer.renderElements(cardsList);//Рендер всех карточек на странице
}).catch(error => console.log(error)); //Отловим ошибки рендера в консоли

//Коллбэк сабмита данных в попапе с данными места
const placeFormSubmitHandler = formValues => {
    const {placeName, placeImage} = formValues;
    const cardObject = {
      name: placeName,
      link: placeImage,
    };
    return api.addCard(cardObject).then(cardObject => {
      const newPlace = new Card(cardObject, userId, placeTemplate, handleCardImageClick, cardDeleteHandler, handleLikeButtonPress);
      const renderedPlace = newPlace.render(); //Рендерим новую карточку
      placeContainer.addItem(renderedPlace); //Добавляем на страницу
    }).catch(error => console.log(error));
}

//Попап добавления нового места
const newPlacePopup = new PopupWithForm(addPlacePopupSelector, placeFormSubmitHandler);

//Вешаем листенер на кнопку добавления нового места
addPlaceButton.addEventListener('click', () => {
  newPlacePopup.open(); //Открываем форму добавления места
});


//ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
//Коллбэк нажатия на кнопку удаления карточки
const cardDeleteHandler = (event, itemId) => {
  // Нажатие на кнопку удаления карточки
  // Вызываем коллбэк удаления карточки и передаем в него айди карточки саму карточку
  const card = event.target.closest(cardSelector);
  // Открытие попапа с подтверждением удаления
  // Передаем при открытии попапа айди карточки в функцию открытия попапа +
  deleteConfirmationPopup.open(itemId, card);
}

//Коллбэк нажатия кнопки в попапе подтверждения удаления
const cardDeleteConfirm = (cardId, card) => {
  return api.deleteCard(cardId).then(responce => {
    card.remove();
    return responce;
  }).catch(error => console.log(error));
}


//Попап подтверждения удаления карточки места
const deleteConfirmationPopup = new PopupWithForm(deleteConfirmationPopupSelector, cardDeleteConfirm);


//Коллбэк подтверждения удаления карточки места
const handleCardDelete = (event, cardId) => {
  const card = event.target.closest(cardSelector); //Вычисляем карточку, которую надо удалить
  const confirmPopup = document.querySelector(deleteConfirmationPopupSelector); //Нам понадобится селектор попапа
  deleteConfirmationPopup.open(); //Открываем попап и передать туда карточку места и кнопку подтверждения

  // Объявим листенер прямо здесь, потому что нам нужна переменная карточки переданная в листенер:
  // поскольку у нас при открытии попапа вешается листенер на кнопку, нам надо его снимать при закрытии попапа,
  // иначе карточки будут удаляться по несколько штук в макете при открытии и закрытии попапа
  // по очереди на разных карточках без нажатия на кнопку удаления
  const deleteCardListener = function (event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      //По клику на кнопку закрытия или по карточке попапа мы также удаляем листенер
      confirmPopup.removeEventListener('click', deleteCardListener);
    } else if (event.target === confirmCardDeleteButton) {
      card.remove(); //Удалили карточку
      //FIXME: Передавать сюда айди карточки для удаления
      //Сделали запрос на удаление
      api.deleteCard(cardId).then(res => {
          deleteConfirmationPopup.close(); //Закрыли попап
          confirmPopup.removeEventListener('click', deleteCardListener); //Удалили листенер
      }).catch(error => console.log(error));
    }
  };

  //При открытии попапа вешаем листенер на нажатие кнопки "ок"
  confirmPopup.addEventListener('click', deleteCardListener);
}

//ЛАЙК КАРТОЧКИ
const handleLikeButtonPress = (event, itemId) => {
  // Проверить, стоит ли лайк
  if (event.target.classList.contains(cardLikeActiveClass)) {
    // Если лайк стоит, снять его
    event.target.classList.remove(cardLikeActiveClass);
    return api.removeLikeFromCard(itemId); //Возвратим промис
  } else {
    // Если лайка нет, поставить его
    event.target.classList.add(cardLikeActiveClass);
    return api.addLikeToCard(itemId); //Тоже возвратим промис
  }
}

//ИЗМЕНЕНИЕ АВАТАРА
//Хэндлер сабмита формы смены аватара
const avatarPopupSubmitHandler = newAvatar => {
  return api.changeAvatar(newAvatar).then(newAvatar => {
    userAvatar.src = newAvatar.avatar; //Записать аватар
  }); //Вернуть промис c объектом аватара
}

//Объявляем попап смены аватара
const avatarPopup = new PopupWithForm(userAvatarPopupSelector, avatarPopupSubmitHandler);

//Вешаем листенер на клик по аватару
userAvatar.addEventListener('click', event => {
  userAvatarInput.value = userAvatar.src;
  avatarPopup.open();
});

//ВАЛИДАЦИЯ ФОРМ - теперь включается для каждой формы отдельно
//Валидация формы смены аватара
const formAvatarValidation = new FormValidator(validationSettings, document.forms.formAvatar);
formAvatarValidation.enableValidation();

//Валидация формы добавления места
const formPlaceValidation = new FormValidator(validationSettings, document.forms.formPlace);
formPlaceValidation.enableValidation();

//Валидация формы редактирования профиля
const formProfileValidation = new FormValidator(validationSettings, document.forms.formProfile);
formProfileValidation.enableValidation();
