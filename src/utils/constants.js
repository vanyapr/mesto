export const token = '22048b95-8eb6-4af2-b310-632c9550d5c5' //Токен
export const cohort = 'cohort-14'//  Идентификатор группы

// Редактирование профиля пользователя
export const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
export const userNameSelector = '.profile__title'; //Селектор имени в профиле
export const userInformationSelector = '.profile__description'; // Селектор рода деятельности в профиле
export const userAvatarSelector = '.profile__avatar'; // Селектор аватара в профиле

// Форма редактирования профиля пользователя
export const profilePopupSelector = '.popup-profile'; // Всплывающее окно редактирования профиля юзера
export const profileName = formProfile.profileName; // Имя в форме
export const profileDescription = formProfile.profileDescription; // Род деятельности в форме

// Добавление нового места
export const addPlaceButton = document.querySelector('.profile__add-button'); // Кнопка добавления нового места
export const placeTemplate = document.querySelector('#place-template').content; // Теплейт одного места в списке мест
export const placesListContainerSelector = '.places__list'; // Селектор контейнера, в котором будем рендерить список мест

// Форма добавления нового места
export const addPlacePopupSelector = '.popup-place'; // Всплывающее окно добавления нового места

// Всплывающее окно с изображением
export const imagePopupSelector = '.image-popup'; //Попап с изображением

//Селекторы и классы карточки места для использования в классе Card
export const cardSelector = '.place';
export const cardImageSelector = '.place__image';
export const cardTitleSelector = '.place__title';
export const cardLikeButtonSelector = '.place__like';
export const cardLikeActiveClass = 'place__like_status_active';
export const cardDeleteButtonSelector = '.place__delete';

//Объект с данными для рендера списка мест
export const initialCards = [
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

//Настройки валидации форм документа
export const validationSettings = {
  formSelector: '.form', //Не используется, нужен ли он?
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};
