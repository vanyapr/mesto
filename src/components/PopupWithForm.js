import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._inputsList = this._popup.querySelectorAll('.form__input'); //Вычислим инпуты формы в конструкторе, чтобы не вычислять каждый раз
    this._formElement = this._popup.querySelector('.form'); //Элемент формы для добавления лестенера
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues () {
    this._inputsValues = {}; //Создадим пустой объект (или обнулим предыдущий)

    this._inputsList.forEach(item => {
      this._inputsValues[item.name] = item.value; //Соберём в него список значений формы, чтобы позже определить, что за форму мы обрабатываем
    });

    return this._inputsValues; //Возвратим объект со значениями формы
  }

  _resetInputValues () {
    this._inputsList.forEach(item => {
      item.value = ''; //Сбрасываем значения при сабмите или закрытии формы
    });
  }

  _setEventListeners () {
    super._setEventListeners(); //Вешаем листенеры по умолчанию

    //Устанавливаем хэндлер сабмита формы
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._submitButton = this._formElement.querySelector('.form__submit');
      this._submitButtonInitialText = this._submitButton.textContent; //Сохранили текст кнопки в переменную

      //Отправляем объект в коллбэк и ожидаем разрешения промиса
      new Promise(resolve => {
        this._submitButton.textContent = 'Сохранение...'; //Поменяли текст кнопки
        this._submitValues = this._getInputValues(); //Получаем объект со значениями полей
        resolve(this._submitValues);
      }).then(formData => {
        //Если при открытии были получены данные карточки, мы вызываем хэндлер с другими параметрами
        if (this._cardId && this._cardToDelete) {
          return this._formSubmitHandler(this._cardId, this._cardToDelete);
        } else {
          return this._formSubmitHandler(formData); //Отправили данные формы в коллбэк
        }
      }).then(success => {
        this.close();
        return success;
      }).finally(data => {
        this._submitButton.textContent =  this._submitButtonInitialText; //Вернули кнопке нормальный текст после закрытия
      });
    })
  }

  open (cardId, card) {
    super.open();

    //Если при открытии формы мы получили параметры, присваиваем их в приватные переменные
    if (cardId && card) {
      this._cardId = cardId;
      this._cardToDelete = card;
    }
  }

  close() {
    super.close();//Закрываем попап
    this._resetInputValues(); //Очищаем форму при закрытии
  }
}

export default PopupWithForm;
