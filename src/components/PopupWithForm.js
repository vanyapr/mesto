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
    const inputsValues = {}; //Создадим пустой объект

    this._inputsList.forEach(item => {
      inputsValues[item.name] = item.value; //Соберём в него список значений формы, чтобы позже определить, что за форму мы обрабатываем
    });

    return inputsValues; //Возвратим список значений
  }

  setEventListeners () {
    super.setEventListeners();

    //Устанавливаем хэндлер сабмита формы
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      super.close();
    })

    //this._formSubmitHandler ()
  }

  close() {
    //Очищаем формы при закрытии
    this._getInputValues();
    super.close();
  }
}

export default PopupWithForm;
