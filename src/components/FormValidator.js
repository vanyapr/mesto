class FormValidator {
  //Передаем форму и объект с настройками в конструктор
  constructor ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._formElement = formElement;
    this._formSelector = formSelector; //Зачем нам нужен здесь форм селектор, если мы его не используем? Для обратной совместимости?
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    //Определим нужные переменные прямо в конструкторе класса, почему бы и нет? Меньше присваиваний в методах.
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    //Проверяем, есть ли в форме невалидные инпуты, используем ранее объявленный список инпутов this._inputList
    const validState = Array.from(this._inputList).some(input => {
      return !input.validity.valid;
    });

    // Возвращаем значение валидности формы
    return !validState; //Если форма валидна, вернёт TRUE
  }

  //Включение кнопки сабмита
  _enableSubmitButton () {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  //Отключение кнопки сабмита
  _disableSubmitButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  //Управление кнопкой сабмита
  _toggleSubmitButton () {
    if (this._isFormValid()) { //Если форма валидна, включаем кнопку
      this._enableSubmitButton();
    } else {  //Иначе выключаем кнопку
      this._disableSubmitButton();
    }
  }

  //Установка эвент листенеров при инициализации объекта
  _setEventListeners () {
    //Выключим кнопку по умолчанию при первой загрузке страницы (если поля не изменялись, а они не могли изменяться)
    this._disableSubmitButton();

    // Вешаем листенер на ввод данных на каждый инпут в форме
    this._inputList.forEach(input => {
      input.addEventListener('input', event => {
        //Валидируем инпут
        this._isInputValid(event.target);
        //Переключаем состояние кнопки
        this._toggleSubmitButton();
      });
    });

    this._formElement.addEventListener('submit', () => {
      //Деактивируем кнопку сабмита после сабмита формы
      //Мы исходим из того, что в целом пользователь не должен отправлять не измененные данные,
      //так сказал куратор группы
      this._disableSubmitButton();
    });
  }

  //Публичный метод включения валидации формы
  enableValidation () {
    this._setEventListeners(); //Установили листенеры событий
  }
}

export default FormValidator;
