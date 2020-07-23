class Card {
  //Получаем параметры в конструктор объекта
  //Нам понадобятся селекторы элементов темплейта, чтобы привязывать листенеры приватными методами
  //Может захардкодить селекторы?
  constructor (cardTitle, imageUrl, templateElement, imageSelector, titleSelector, likeButtonSelector, likeActiveClass, deleteButtonSelector, imagePopupSelector, popupImage, popupTitle ) {
    //Присваиваем внутренние переменные, они все будут приватными, потому что мы не используем их снаружи
    this._cardTitle = cardTitle;
    this._imageUrl = imageUrl;
    this._templateElement = templateElement;
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._deleteButtonSelector = deleteButtonSelector;
    this._likeActiveClass = likeActiveClass;
  }

  //Получаем темплейт
  _getTemplate () {
    return this._templateElement.cloneNode(true); //Склонировали темплейт и вернули его
  }

  //Заполняем темплейт значениями и возвращает заполненный темплейт
  _fillTemplate () {
    //Определили переменные для перезаписи значений
    this._template = this._getTemplate();
    this._image = this._template.querySelector(this._imageSelector);
    this._title = this._template.querySelector(this._titleSelector);

    //Перезаписали значения
    this._image.src = this._imageUrl;
    this._image.alt = this._cardTitle;
    this._title.textContent = this._cardTitle;

    //Вернули результат - заполненный темплейт
    return this._template;
  }

  //Установка лайка
  _toggleLikeButton (event) {
    //По клику на кнопку устанавливаем ей соответствующий класс
    event.target.classList.toggle(this._likeActiveClass);
  }

  //Удаление карточки
  _removeCard (event) {
    //Удаляем карточку по селектору
    //TODO: Передавать переменную '.place' в класс
    event.target.closest('.place').remove();
  }

  //Открытие попапа с картинкой
  _toggleImagePopup (event) {

  }

  //Объявляем эвент листенеры
  _setEventListeners (template) {
    //Листенер на лайк карточки
    template.querySelector(this._likeButtonSelector).addEventListener('click', (event) => {
      this._toggleLikeButton(event);
    });

    //Листенер на удаление карточки
    template.querySelector(this._deleteButtonSelector).addEventListener('click', (event) => {
      this._removeCard(event);
    });
  }

  //Рендерим карту и возвращаем готовый объект (публичный метод)
  render () {
    const template = this._fillTemplate(); //Получаем заполненный темплейт
    this._setEventListeners(template); //Добавляем эвент листенеры

    //Возвращаем темплейт
    return template;
  }

}

//Экспортируем класс карточки места
export default Card;
