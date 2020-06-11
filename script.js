// РАБОТА С ПОП-АПОМ
// Кнопка редактирования профиля
let editProfile = document.querySelector('.profile__edit-button');
// Кнопка закрытия поп-апа
let closePopup = document.querySelector('.form__close');
// Сам поп-ап
let popup = document.querySelector('.popup');

// Функция открытия и закрытия поп-апа
function togglePopup () {
  //Если у поп-апа нет класса "popup_opened", мы его добавляем по клику, иначе убираем этот класс
  popup.classList.toggle('popup_opened');
  console.log('form close');
}

// Открываем профиль по клику на кнопку редактирования профиля
editProfile.addEventListener('click', togglePopup);

// Закрываем форму редактирования по клику на кнопку закрытия
closePopup.addEventListener('click', togglePopup);

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// Имя в профиле
let name = document.querySelector('.profile__title');
// Род деятельности в профиле
let description = document.querySelector('.profile__description');
// Форма с полями
let form = document.querySelector('.form');
// Имя в форме
let formName = document.querySelector('.form__input_value_name');
// Род деятельности в форме
let formDescription = document.querySelector('.form__input_value_description');

// Записываем значения из профиля в поля формы при открытии страницы
formName.value = name.textContent;
formDescription.value = description.textContent;


// Если форма была отправлена, перезаписываем значения в профиле

function formSubmitHandler (event) {
  event.preventDefault();

  name.textContent = formName.value;
  description.textContent = formDescription.value;
  togglePopup ();
}

form.addEventListener('submit', formSubmitHandler);
