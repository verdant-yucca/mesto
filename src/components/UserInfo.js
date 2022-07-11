// Класс UserInfo отвечает за управление
// отображением информации о пользователе на странице
class UserInfo {
  constructor(nameProfile, infoProfile) {
    this._nameProfile = document.querySelector(nameProfile);
    this._infoProfile = document.querySelector(infoProfile);
  }

  // публичный метод getUserInfo, который возвращает объект
  // с данными пользователя. Этот метод пригодится когда
  // данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userInfo = {
      name: this._nameProfile.textContent,
      info: this._infoProfile.textContent
    };
    return userInfo;
  }

  // публичный метод setUserInfo, который принимает новые
  // данные пользователя и добавляет их на страницу.
  setUserInfo(userInfo) {
    this._nameProfile.textContent = userInfo.name;
    this._infoProfile.textContent = userInfo.info;
  }
}

export { UserInfo };
