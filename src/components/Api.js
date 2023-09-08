export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
        "Content-Type": "application/json",
      },
    });
  }

  updateUserInfo(data) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateUserImage(imageURL) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: imageURL,
        }),
      }
    );
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    });
  }

  addCard(card) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
        "Content-Type": "application/json",
      },
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

  // loadPageContent() {}
}
