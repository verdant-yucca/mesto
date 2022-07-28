class UserInfo {
  constructor( { nameProfileSelector, infoProfileSelector, avatarProfileSelector } ) {
    this._nameProfile = document
      .querySelector('.profile')
      .querySelector(nameProfileSelector);
    this._infoProfile = document
      .querySelector('.profile')
      .querySelector(infoProfileSelector);
    this._avatarProfile = document
      .querySelector('.profile')
      .querySelector(avatarProfileSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameProfile.textContent,
      info: this._infoProfile.textContent
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._nameProfile.textContent = userInfo.name;
    this._infoProfile.textContent = userInfo.about;
    this._avatarProfile.style.backgroundImage = `url(${userInfo.avatar})`;
  }
}

export { UserInfo };
