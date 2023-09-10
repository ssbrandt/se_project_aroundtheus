export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    });
  }

  updateUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateUserImage(imageURL) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageURL,
      }),
    });
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    });
  }

  addCard(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  deleteCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
      method: "DELETE",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    });
  }

  likeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "PUT",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    });
  }
  unlikeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "DELETE",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    });
  }

  loadPageContent() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
