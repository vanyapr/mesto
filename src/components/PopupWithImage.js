import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._image = this._popup.querySelector('.popup__image'); //Определяем значения в конструкторе
    this._text = this._popup.querySelector('.popup__image-description'); //Потому что так будет меньше повторения кода в методах
  }

  open (imageUrl, imageText) {
    super.open(); //Вызываем родительский метод открытия попапа

    //При открытии попапа записываем данные в поля
    this._image.src = imageUrl; //Ссылка на картинку
    this._image.alt = imageText; //Альтернативный текст
    this._text.textContent = imageText; //Текст картинки
  }
}

export default PopupWithImage;
