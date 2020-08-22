class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  //Слушатель на закрытие по кнопке эскейп
  _handleEscClose = event => {
    if (event.key === 'Escape') { //Если нажат эскейп
      this.close();
    }
  }

  //Слушатель попыток закрытия попапа кликом по кнопке или фону
  _handleCloseActions = event => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _setEventListeners () {
    //Вешаем слушатель на клик вне попапа
    //Вешаем слушатель на клик по кнопке закрытия
    this._popup.addEventListener('click', this._handleCloseActions);
    //Вешаем слушатель на кнопку эскейп
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners () {
    this._popup.removeEventListener('click', this._handleCloseActions);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._setEventListeners();
    //Открываем попап
    this._popup.classList.add('popup_opened');
  }

  close() {
    //Убираем слушатель с кнопки эскейп
    this._removeEventListeners();
    //Закрываем попап
    this._popup.classList.remove('popup_opened');
  }
}

export default Popup;
