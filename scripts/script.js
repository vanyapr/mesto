// РАБОТА С ПОП-АПОМ
// Кнопка редактирования профиля
const editProfile = document.querySelector('.profile__edit-button');
// Кнопка закрытия поп-апа
const closePopup = document.querySelector('.form__close');
// Сам поп-ап
const popup = document.querySelector('.popup');

// Функция открытия и закрытия поп-апа
function togglePopup () {
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
function formSubmitHandler (event) {
  event.preventDefault();

  name.textContent = formName.value;
  description.textContent = formDescription.value;
  //Не забываем закрыть форму
  togglePopup();
}

form.addEventListener('submit', formSubmitHandler);
