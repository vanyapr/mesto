class Card {
  //Получаем параметры в конструктор объекта
  //Нам понадобятся селекторы элементов темплейта, чтобы привязывать листенеры приватными методами
  constructor (cardTitle, imageUrl, itemOwnerId, userId, itemId, itemLikes, templateElement, imageSelector, titleSelector, likeButtonSelector, likeActiveClass, deleteButtonSelector, cardLikeCounterSelector, cardLikesCount, handleCardClick, handleCardDelete, handleLikeButtonPress) {
    //Присваиваем внутренние переменные, они все будут приватными, потому что мы не используем их снаружи
    //Напишу много переменных чтобы сделать код самодокументируемым
    this._cardTitle = cardTitle;
    this._imageUrl = imageUrl;
    this._itemOwnerId = itemOwnerId;
    this._userId = userId;
    this._itemId = itemId;
    this._itemLikes = itemLikes; //Массив со списком лайкнувших карточку
    this._templateElement = templateElement;
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
    this._likeButtonSelector = likeButtonSelector;
    this._deleteButtonSelector = deleteButtonSelector;
    this._likeActiveClass = likeActiveClass;
    this._cardLikeCounterSelector = cardLikeCounterSelector; //Добавил селектор лайка для записи числа лайков в карточку
    this._cardLikesCount = cardLikesCount; //Число лайков в карточку
    this._handleCardClick = handleCardClick; //Функция обратного вызова для обработки клика на карточку
    this._handleCardDelete = handleCardDelete; //Функция обратного вызова для обработки удаления места
    this._handleLikeButtonPress = handleLikeButtonPress; //Функция обратного вызова для обработки лайка
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
    this._deleteButton = this._template.querySelector(this._deleteButtonSelector);

    //Проверили
    if (!(this._userId === this._itemOwnerId)) {
      console.log('Not match'); //Это не моё изобрадение
      this._deleteButton.remove();
    }

    this._image = this._template.querySelector(this._imageSelector); //Картинка
    this._title = this._template.querySelector(this._titleSelector); //Текст
    this._likes = this._template.querySelector(this._cardLikeCounterSelector); //Лайки на карточке
    this._likeButton = this._template.querySelector(this._likeButtonSelector); //Кнопка лайка

    //Перезаписали значения
    this._image.src = this._imageUrl;
    this._image.alt = this._cardTitle;
    this._title.textContent = this._cardTitle;
    this._likes.textContent = this._cardLikesCount;

    //Проверяем, есть ли на карточке наши лайки, и добавляем активное состояние карточкам с нашими лайками
    if (this._checkLikes()) {
      this._likeButton.classList.add(this._likeActiveClass);
    }

    //Вернули результат - заполненный темплейт
    return this._template;
  }

  //Установка лайка
  _toggleLikeButton (event) {
    this._handleLikeButtonPress(event, this._itemId)
      .then(json => this._likes.textContent = json.likes.length);// Увеличить/уменьшить число лайков
  }

  _checkLikes () {
    // Проверяем, содержит ли массив лайков этой карточки совпадение с айди Владельца
    return this._itemLikes.some(item => {
      return item._id === this._userId; //Если в массиве есть мой айди, возвращаем true
    })
  }

  //Удаление карточки
  _removeCard = event => {
    this._handleCardDelete(event, this._itemId); //В коллбэк передается идентификатор карточки и событие удаления
  }

  //Открытие попапа с картинкой
  _openImagePopup () {
    this._handleCardClick(this._imageUrl, this._cardTitle); //Передаем данные во внешний коллбэк
  }

  //Объявляем эвент листенеры
  _setEventListeners (template) {
    //Листенер на лайк карточки
    template.querySelector(this._likeButtonSelector).addEventListener('click', (event) => {
      this._toggleLikeButton(event);
    });

    //Находим в темплейте кнопку удаления
    this._deleteButton = template.querySelector(this._deleteButtonSelector);

    //Ставим листенер на кнопку удаления только если эта кнопку существует
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', this._removeCard);
    }

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
