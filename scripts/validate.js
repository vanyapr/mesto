// Проверка валидности инпута, принимает форму и инпут, проверяет валиден ли инпут и расставляет нужные классы
const isInputValid = (formElement, input, errorClass, inputErrorClass) => {
    const errorMessage = formElement.querySelector(`#${input.id}-error`) ;// Находим контейнер ошибки по идентификатору инпута

    // Проверяем валидность данных в инпуте
    if (!input.validity.valid) { // Инпут невалиден
      // Добавляем класс невалидности инпуту
      input.classList.add(inputErrorClass);
      // Добавляем текст ошибки
      errorMessage.textContent = input.validationMessage;
      // Показываем ошибку
      errorMessage.classList.add('form__error_active');
    } else { // Инпут валиден
      // Удаляем класс невалидности у инпута
      input.classList.remove(inputErrorClass);
      // Скрываем ошибку
      errorMessage.classList.remove('form__error_active');
      // Очищаем сообщение об ошибке
      errorMessage.textContent = '';
    }
};

// Проверка валидности всех инпутов в форме, вовзратит true если форма валидна
const isFormValid = (formElement, inputSelector) => {
  const inputsList = formElement.querySelectorAll(inputSelector); // Находим все инпты в форме

  //Проверяем, есть ли в форме невалидные инпуты
  const validState =  Array.from(inputsList).some(input => {
    return !input.validity.valid;
  });

  // Возвращаем значение валидности формы
  //console.log(!validState);
  return !validState;
};

// Включение и выключение кнопки сабмита в форме
const toggleSubmitButton = (formElement, submitButtonSelector, inactiveButtonClass, inputSelector) => {

  const button = formElement.querySelector(submitButtonSelector); // Находим кнопку в форме

  // Если кнопка находится в валидной форме
  if(isFormValid(formElement, inputSelector)) {
    // Включаем кнопку
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    // Иначе отключаем кнопку
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  }
};

// Добавление эвент листенеров на элементы формы
const setEventListeners = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const formList = document.querySelectorAll(formSelector);

  // 1) Для каждой формы повесить листенеры
  formList.forEach(formElement => {
    // Выключим кнопку по умолчанию при загрузке страницы, если поля пустые
    toggleSubmitButton(formElement, submitButtonSelector, inactiveButtonClass, inputSelector);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // Список инпутов в форме

    // Вешаем листенер на ввод данных в инпут
    inputList.forEach(input => {
      input.addEventListener('input', event => {
        isInputValid(formElement, event.target, errorClass, inputErrorClass); // Валидируем поля
        toggleSubmitButton(formElement, submitButtonSelector, inactiveButtonClass, inputSelector); // Управление кнопкой сабмита
      });
    });

    // Отменяем поведение формы по дефолту (по идее оно уже отменено в скрипте выше?)
    // formElement.addEventListener('submit', event => {
    //   event.preventDefault();
    // });
  })
};

const enableValidation = whatToValidate => {
  const formSelector = whatToValidate.formSelector; // Cписок форм в документе
  const inputSelector = whatToValidate.inputSelector; // Селектор инпута
  const submitButtonSelector = whatToValidate.submitButtonSelector; // Селектор кнопки
  const inactiveButtonClass = whatToValidate.inactiveButtonClass; // Класс для ОТКЛЮЧЕНИЯ кнопки
  const inputErrorClass = whatToValidate.inputErrorClass; // Класс инпута с ошибкой
  const errorClass = whatToValidate.errorClass; // Класс ошибки

  // Подключаем эвент листенеры
  setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
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
