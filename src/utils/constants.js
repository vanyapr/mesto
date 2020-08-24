export const token = '22048b95-8eb6-4af2-b310-632c9550d5c5' //Токен
export const cohort = 'cohort-14'//  Идентификатор группы

// Редактирование профиля пользователя
export const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
export const userNameSelector = '.profile__title'; //Селектор имени в профиле
export const userInformationSelector = '.profile__description'; // Селектор рода деятельности в профиле
export const userAvatarSelector = '.profile__avatar'; // Селектор аватара в профиле

// Форма редактирования профиля пользователя
export const profilePopupSelector = '.popup-profile'; // Всплывающее окно редактирования профиля юзера
export const profileName = document.forms.formProfile.profileName; // Имя в форме
export const profileDescription = document.forms.formProfile.profileDescription; // Род деятельности в форме

// Добавление нового места
export const addPlaceButton = document.querySelector('.profile__add-button'); // Кнопка добавления нового места
export const placeTemplate = document.querySelector('#place-template').content; // Теплейт одного места в списке мест
export const placesListContainerSelector = '.places__list'; // Селектор контейнера, в котором будем рендерить список мест

// Форма добавления нового места
export const addPlacePopupSelector = '.popup-place'; // Всплывающее окно добавления нового места

// Всплывающее окно с изображением
export const imagePopupSelector = '.image-popup'; //Попап с изображением

//Кнопка подтверждения удаления карточки места
export const deleteConfirmationPopupSelector = '.popup_type_confirm';
export const confirmCardDeleteButton = document.querySelector('.form__submit_type_confirm');

//Селектор инпута со ссылкой на аватар пользователя
export const userAvatarPopupSelector = '.popup-avatar';
export const userAvatar = document.querySelector('.profile__avatar'); //Считаю, что правильно отлавливать именно контейнер
export const userAvatarInput = document.forms.formAvatar.avatar;

//Селекторы и классы карточки места для использования в классе Card
export const cardSelector = '.place';
//export const cardImageSelector = '.place__image';
//export const cardTitleSelector = '.place__title';
//export const cardLikeButtonSelector = '.place__like';
export const cardLikeActiveClass = 'place__like_status_active';
//export const cardLikeCounterSelector = '.place__likes-count';
//export const cardDeleteButtonSelector = '.place__delete';

//Настройки валидации форм документа
export const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};
