class Card {
  //Получаем параметры в конструктор объекта
  //Нам понадобятся селекторы элементов темплейта, чтобы привязывать листенеры приватными методами
  constructor (title, image, templateElement, imageSelector, titleSelector, likeButtonSelector, likeActiveClass, deleteButtonSelector ) {
    //Присваиваем внутренние переменные
    this.title = title;
    this.image = image;
    this.templateElement = templateElement;
    this.imageSelector = imageSelector;
    this.titleSelector = titleSelector;
    this.likeButtonSelector = likeButtonSelector;
    this.deleteButtonSelector = deleteButtonSelector;
    this.likeActiveClass = likeActiveClass;
  }

  //Получаем темплейт
  _getTemplate () {
    const template = this.templateElement.cloneNode(true); //Склонировали темплейт и записали в переменную
    return template; //Вернули темплейт
  }

  //Заполняем темплейт значениями и возвращает заполненный темплейт
  _fillTemplate () {
    //Определили переменные для изменения
    const template = this._getTemplate();
    const image = template.querySelector(this.imageSelector);
    const title = template.querySelector(this.titleSelector);

    //Заполнили значения
    image.src = this.image;
    image.alt = this.title;
    title.textContent = this.title;

    //Вернули результат - заполненный темплейт
    return template;
  }

  //Установка лайка
  _toggleLikeButton (event) {
    //По клику на кнопку устанавливаем ей соответствующий класс
    event.target.classList.toggle(this.likeActiveClass);
  }

  //Удаление карточки
  _removeCard (event) {
    //TODO: this.remove() ?
    event.target.closest('.place').remove();
  }

  //Открытие попапа
  _toggleImagePopup (event) {

  }

  //Объявляем эвент листенеры
  _setEventListeners () {
    //Листенер на лайк
    this.templateElement.querySelector(this.likeButtonSelector).addEventListener('click', () => {
      this._toggleLikeButton();
    });
    //Листенер на удаление
    this.templateElement.querySelector(this.deleteButtonSelector).addEventListener('click', () => {
      this._removeCard();
    });
  }






  //Устанавливаем эвент листенеры


  //Рендерим карту и возвращаем готовый объект (публичный метод)
  render () {
    this._setEventListeners();
    return this._fillTemplate();
  }


}

//Экспортируем класс карточки места
export default Card;
