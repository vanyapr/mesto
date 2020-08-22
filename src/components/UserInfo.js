class UserInfo {
  constructor({userNameSelector, userInformationSelector, userAvatarSelector}) {
    this._userNameSelector = userNameSelector;
    this._userInformationSelector = userInformationSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userAvatar = document.querySelector(this._userAvatarSelector); //Вычислили аватар пользователя
    this._userName = document.querySelector(this._userNameSelector); //Вычислили элементы в конструкторе
    this._userInformation = document.querySelector(this._userInformationSelector); //Вычислили элементы в конструкторе
  }

  getUserInfo () {
    this._userInfo = {}; //Создали пустой объект
    this._userInfo.userName = this._userName.textContent; //Имя пользователя
    this._userInfo.userInformation = this._userInformation.textContent; //Описание пользователя
    this._userInfo.userAvatar = this._userAvatar.src //Аватар
    //FIXME
    console.log("Передаем объект методом getUserInfo()");
    console.log(this._userInfo);
    return this._userInfo; //Вернули объект
  }

  setUserInfo (userName, userInformation, userAvatarUrl) {
    //Записали данные на страницу
    this._userName.textContent = userName;
    this._userInformation.textContent = userInformation;

    //Меняем аватар пользователя только если он был получен в аргументах метода
    if (userAvatarUrl) {
      this._userAvatar.src = userAvatarUrl;
      this._userAvatar.alt = userName;
    }

    console.log("Записали на страницу");
    console.log(userName, userInformation, userAvatarUrl)

  }
}

export default UserInfo;
