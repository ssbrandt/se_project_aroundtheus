export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
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
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
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
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }

  //addCard(){}
  //deleteCard(){}
  //likeCard(){}
  //unlikeCard() {}
}
