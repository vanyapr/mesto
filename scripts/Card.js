class Card {
  //Получаем параметры в конструктор объекта
  //Нам понадобятся селекторы элементов темплейта, чтобы привязывать листенеры приватными методами
  //TODO: Больше абстракции, передать в класс недостающие переменные
  constructor (cardTitle, imageUrl, templateElement, imageSelector, titleSelector, likeButtonSelector, likeActiveClass, deleteButtonSelector, imagePopup, popupImage, popupTitle) {
    //Присваиваем внутренние переменные, они все будут приватными, потому что мы не используем их снаружи
    //Напишу много переменных чтобы сделать код самодокументируемым
    this._cardTitle = cardTitle;
    this._imageUrl = imageUrl;
    this._templateElement = templateElement;
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._deleteButtonSelector = deleteButtonSelector;
    this._likeActiveClass = likeActiveClass;
    this._imagePopup = imagePopup;
    this._popupImage = popupImage;
    this._popupTitle = popupTitle;
  }

  //Коллбэк нажатия кнопки эскейп, стрелочной функцией
  _escapePressHandler = event => {
    //Если нажали на эскейп
    if(event.key === 'Escape') {
      //Закрыть попап
      this._closeImagePopup();
    }
  }

  //Получаем темплейт
  _getTemplate () {
    //Решил не присваивать переменную для удобочитаемости
    return this._templateElement.cloneNode(true); //Склонировали темплейт и вернули его
  }

  //Заполняем темплейт значениями и возвращает заполненный темплейт
  _fillTemplate () {
    //Определили переменные для перезаписи значений
    this._template = this._getTemplate(); //Темплейт
    this._image = this._template.querySelector(this._imageSelector); //Картинка
    this._title = this._template.querySelector(this._titleSelector); //Текст

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

  //Запись данных в попап с картинкой
  _writeImagePopup () {
    this._popupImage.src = this._imageUrl; //Ссылка на изображение
    this._popupImage.alt = this._cardTitle; //Альтернативный текст картинки
    this._popupTitle.textContent = this._cardTitle; //Название изображения
  }

  //Сброс данных в попапе
  _resetImagePopup () {
    this._popupImage.src = ''; //Ссылка на изображение
    this._popupImage.alt = ''; //Альтернативный текст картинки
    this._popupTitle.textContent = ''; //Название изображения
  }

  //Открытие попапа с картинкой
  _openImagePopup () {
    this._writeImagePopup(); //Записываем данные
    //TODO: Передавать переменную 'popup_opened' в класс
    this._imagePopup.classList.add('popup_opened'); //Открываем попап

    // Добавляем листенер на закрытие попапа по нажатию кнопки эскейп. Тут будет правильнее это сделать.
    document.addEventListener('keydown', this._escapePressHandler);
  }

  //Закрытие попапа с картинкой
  _closeImagePopup () {
    //TODO: Передавать переменную 'popup_opened' в класс
    this._imagePopup.classList.remove('popup_opened'); //Закрываем попап
    this._resetImagePopup(); //Сбрасываем данные
    document.removeEventListener('keydown', this._escapePressHandler); //Удаляем эвент листенер
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

    //Листенер на открытие окна просмотра изображения
    template.querySelector(this._imageSelector).addEventListener('click', () => {
      this._openImagePopup ();
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
