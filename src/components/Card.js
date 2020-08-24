class Card {
  constructor (cardObject, userId, templateElement, handleCardClick, handleCardDelete, handleLikeButtonPress) {
    this._cardTitle = cardObject.name;
    this._imageUrl = cardObject.link;
    this._itemOwnerId = cardObject.owner._id;
    this._itemId = cardObject._id;
    this._itemLikes = cardObject.likes; //Массив со списком лайкнувших карточку
    this._cardLikesCount = this._itemLikes.length; //Число лайков в карточку
    this._userId = userId;
    this._templateElement = templateElement;
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
    this._deleteButton = this._template.querySelector('.place__delete');//Кнопка удаления

    //Проверили
    if (!(this._userId === this._itemOwnerId)) {
      this._deleteButton.remove();
    }

    this._image = this._template.querySelector('.place__image'); //Картинка
    this._title = this._template.querySelector('.place__title'); //Текст
    this._likes = this._template.querySelector('.place__likes-count'); //Лайки на карточке
    this._likeButton = this._template.querySelector('.place__like'); //Кнопка лайка

    //Перезаписали значения
    this._image.src = this._imageUrl;
    this._image.alt = this._cardTitle;
    this._title.textContent = this._cardTitle;
    this._likes.textContent = this._cardLikesCount;

    //Проверяем, есть ли на карточке наши лайки, и добавляем активное состояние карточкам с нашими лайками
    if (this._checkLikes()) {
      this._likeButton.classList.add('place__like_status_active');
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
    template.querySelector('.place__like').addEventListener('click', (event) => {
      this._toggleLikeButton(event);
    });

    //Находим в темплейте кнопку удаления
    this._deleteButton = template.querySelector('.place__delete');

    //Ставим листенер на кнопку удаления только если эта кнопку существует
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', this._removeCard);
    }

    //Листенер на открытие окна просмотра изображения
    template.querySelector('.place__image').addEventListener('click', () => {
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
