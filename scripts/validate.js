// План
// 1) Для каждой формы повесить листенер

// Форма невалидна
// 2) Если форма невалидна, выключать кнопку
// 3) Если одно поле невалидно, отображать ошибку валидации
// 4) Если одно поле невалидно, добавлять полю класс невалидности

// Форма валидна
// 5) Если одно поле валидно, убирать ошибку валидации
// 6) Если одно поле валидно, убирать класс невалидности
// 7) Если форма валидна, включать кнопку

const displayInputError = input => {

};

// Проверка валидности инпута
const isInputValid = (form, inputSelector, errorClass, inputErrorClass) => {
  const inputsList = form.querySelectorAll(inputSelector); // Находим все инпты в форме

  Array.from(inputsList).forEach(input => {
    const errorMessage = form.querySelector(`#${input.id}-error`) ;// Находим контейнер ошибки по идентификатору инпута

    // Проверяем валидность данных в инпуте
    if (!input.validity.valid) { //Инпут невалиден
      // Добавляем класс невалидности инпуту
      input.classList.add(inputErrorClass);
      // Добавляем текст ошибки
      errorMessage.textContent = input.validationMessage;
      // Показываем ошибку
      errorMessage.classList.add('form__error_active');
    } else { //Инпут валиден
      // Удаляем класс невалидности у инпута
      input.classList.remove(inputErrorClass);
      //Скрываем ошибку
      errorMessage.classList.remove('form__error_active');
      //Очищаем сообщение об ошибке
      errorMessage.textContent = '';
    }
  });
};

// Проверка валидности всех инпутов в форме
const isFormValid = (form, inputSelector) => {
  const inputsList = form.querySelectorAll(inputSelector); // Находим все инпты в форме

  //Проверяем, есть ли в форме невалидные инпуты
  const validState =  Array.from(inputsList).some(input => {
    return !input.validity.valid;
  });

  // Возвращаем значение валидности формы
  //console.log(!validState);
  return !validState;
};

// Включение и выключение кнопки сабмита в форме
const toggleSubmitButton = (form, submitButtonSelector, inactiveButtonClass, inputSelector) => {

  const button = form.querySelector(submitButtonSelector); //Находим кнопку в форме

  //Если кнопка находится в валидной форме
  if(isFormValid(form, inputSelector)) {
    //Включаем её
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    //Иначе отключаем
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  }
};

const enableValidation = whatToValidate => {
  const formList = document.querySelectorAll(whatToValidate.formSelector); // Cписок форм в документе
  const inputSelector = whatToValidate.inputSelector; // Селектор инпута
  const submitButtonSelector = whatToValidate.submitButtonSelector; // Селектор кнопки
  const inactiveButtonClass = whatToValidate.inactiveButtonClass; // Класс для ОТКЛЮЧЕНИЯ кнопки
  const inputErrorClass = whatToValidate.inputErrorClass; // Класс инпута с ошибкой
  const errorClass = whatToValidate.errorClass; // Класс ошибки

  // 1) Для каждой формы повесить листенеры
  formList.forEach(form => {
    //Выключим кнопку по умолчанию
    toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);

    // Вешаем листенер на ввод данных в форму
    form.addEventListener('input', event => {

      // Валидируем поля в форме
      isInputValid(form, inputSelector, errorClass, inputErrorClass);

      toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
    });

    // Вешаем листенер на ввод данных в форму
    form.addEventListener('input', event => {

      // Валидируем поля в форме
      isInputValid(form, inputSelector, errorClass, inputErrorClass);

      toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
    });

  })
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error'
});
