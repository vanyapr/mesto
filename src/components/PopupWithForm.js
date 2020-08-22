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
      this._submitValues = this._getInputValues(); //Получаем объект со значениями полей
      this._formSubmitHandler(this._submitValues); //Передаем функции обратного вызова
      super.close(); //Закрываем форму
    })
  }

  close() {
    //Очищаем форму при закрытии
    this._resetInputValues();
    //И закрываем
    super.close();
  }
}

export default PopupWithForm;
