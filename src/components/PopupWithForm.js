class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues () {

  }

  setEventListeners () {
    //Устанавливаем валидацию форм
  }

  close() {
    //Очищаем формы при закрытии
  }
}
