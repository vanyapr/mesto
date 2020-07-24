class FormValidator {
  //Передаем форму и объект с настройками в конструктор
  constructor ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._formElement = formElement;
    this._formSelector = formSelector; //Зачем нам нужен здесь форм селектор?
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  //Проверка валидности инпута
  _isInputValid (input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`) ;// Находим контейнер ошибки по идентификатору инпута

    // Проверяем валидность данных в инпуте
    if (!input.validity.valid) { // Инпут невалиден
      // Добавляем класс невалидности инпуту
      input.classList.add(this._inputErrorClass);
      // Добавляем текст ошибки
      errorMessage.textContent = input.validationMessage;
      // Показываем ошибку
      errorMessage.classList.add(this._errorClass);
    } else { // Инпут валиден
      // Удаляем класс невалидности у инпута
      input.classList.remove(this._inputErrorClass);
      // Скрываем ошибку
      errorMessage.classList.remove(this._errorClass);
      // Очищаем сообщение об ошибке
      errorMessage.textContent = '';
    }
  }


  //Проверка валидности всей формы
  _isFormValid () {
    const inputsList = this._formElement.querySelectorAll(this._inputSelector); // Находим все инпты в форме

    //Проверяем, есть ли в форме невалидные инпуты
    const validState =  Array.from(inputsList).some(input => {
      return !input.validity.valid;
    });

    // Возвращаем значение валидности формы
    return !validState;
  }

  //Включение кнопки сабмита
  _enableSubmitButton (submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  //Отключение кнопки сабмита
  _disableSubmitButton (submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  //Управление кнопкой сабмита
  _toggleSubmitButton () {
    //Определяем кнопку сабмита
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    if (this._isFormValid()) { //Если форма валидна, включаем
      this._enableSubmitButton(submitButton);
      console.log('Переключили состояние кнопки на ВКЛЮЧЕНА');
    } else {  //Иначе выключаем
      this._disableSubmitButton(submitButton);
      console.log('Переключили состояние кнопки на ОТКЛЮЧЕНА');
    }



  }

  //Установка эвент листенеров при инициализации объекта
  _setEventListeners () {

    //Выключим кнопку по умолчанию при первой загрузке страницы (если поля пустые)
    this._toggleSubmitButton();

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); // Список инпутов в форме

    // Вешаем листенер на ввод данных на каждый инпут в форме
    this._inputList.forEach(input => {
      input.addEventListener('input', event => {
        //Валидируем инпут
        this._isInputValid(event.target);
        //Переключаем состояние кнопки
        this._toggleSubmitButton();
      });
    });


  }


  //Публичный метод включения валидации формы
  enableValidation () {
    this._setEventListeners();

    console.log(this._formElement);
    console.log('Validation enabled for ' + this._formElement.name);
  }
}

export default FormValidator;
