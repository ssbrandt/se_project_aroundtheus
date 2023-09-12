export default class UserInfo {
  constructor({
    userNameSelector,
    userInfoSelector,
    userImageSelector,
    userId,
  }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userImage = document.querySelector(userImageSelector);
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._userImage.src = avatar;
    this._userImage.alt = `Image of ${name}`;
    this._userId = _id;
  }
}
