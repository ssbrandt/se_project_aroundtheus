export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  updateUserImage(imageURL) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageURL,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  addCard(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  likeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "PUT",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    }).then((res) => this._checkResponse(res));
  }
  unlikeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "DELETE",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    }).then((res) => this._checkResponse(res));
  }

  loadPageContent() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
