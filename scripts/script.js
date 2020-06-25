// РАБОТА С ПОП-АПОМ
// Кнопка редактирования профиля
const editProfile = document.querySelector('.profile__edit-button');
// Кнопка закрытия поп-апа
const closePopup = document.querySelector('.form__close');
// Сам поп-ап
const popup = document.querySelector('.popup');

// Функция открытия и закрытия поп-апа
const togglePopup = () => {
  // Записываем значения из профиля в поля формы при открытии страницы
  formName.value = name.textContent;
  formDescription.value = description.textContent;

  //Если у поп-апа нет класса "popup_opened", мы его добавляем по клику, иначе убираем этот класс
  popup.classList.toggle('popup_opened');
}

// Открываем профиль по клику на кнопку редактирования профиля
editProfile.addEventListener('click', togglePopup);

// Закрываем форму редактирования по клику на кнопку закрытия
closePopup.addEventListener('click', togglePopup);

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// Имя в профиле
const name = document.querySelector('.profile__title');
// Род деятельности в профиле
const description = document.querySelector('.profile__description');
// Форма с полями
const form = document.querySelector('.form');
// Имя в форме
const formName = document.querySelector('.form__input_value_name');
// Род деятельности в форме
const formDescription = document.querySelector('.form__input_value_description');


// Если форма была отправлена, перезаписываем значения в профиле
const formSubmitHandler = (event) => {
  event.preventDefault();

  name.textContent = formName.value;
  description.textContent = formDescription.value;
  //Не забываем закрыть форму
  togglePopup();
}

form.addEventListener('submit', formSubmitHandler);


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
  return renderTemplate; //Возвращаем готовый темплейт
}

//При загрузке страницы расставляем карточки в контейнере
//Каждую карточку рендерим внутри контейнера
initialCards.forEach(item => placesContainer.append(renderPlace(item)));

//С использованием темплейтов
