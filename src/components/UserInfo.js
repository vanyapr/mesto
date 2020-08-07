class UserInfo {
  constructor({userNameSelector, userInformationSelector}) {
    this._userNameSelector = userNameSelector;
    this._userInformationSelector = userInformationSelector;
    this._userName = document.querySelector(this._userNameSelector); //Вычислили элементы в конструкторе
    this._userInformation = document.querySelector(this._userInformationSelector); //Вычислили элементы в конструкторе
  }

  getUserInfo () {
    this._userInfo = {}; //Создали пустой объект
    this._userInfo.userName = this._userName.textContent; //Получили значения
    this._userInfo.userInformation = this._userInformation.textContent; //Получили значения
    return this._userInfo; //Вернули объект
  }

  setUserInfo (userName, userInformation) {
    //Записали данные на страницу
    this._userName.textContent = userName;
    this._userInformation.textContent = userInformation;
  }
}

export default UserInfo;
