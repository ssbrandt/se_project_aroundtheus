export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return { name: this._userName, info: this._userInfo };
  }

  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }
}
