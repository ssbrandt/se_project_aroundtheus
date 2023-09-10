import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

/*////////////////////////////////////////////////////////////////////
/                          API                                       /
////////////////////////////////////////////////////////////////////*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a9ab881f-c455-4a3d-9bb8-b4ec04211711",
    "Content-Type": "application/json",
  },
});

/*////////////////////////////////////////////////////////////////////
/                         Page Contents                              /
////////////////////////////////////////////////////////////////////*/

const addLocationButton = document.querySelector(".profile__add-button");
const profileFormElement = document.forms["edit-profile-form"];
const editProfileName = profileFormElement.querySelector("#name");
const editProfileSubtitle = profileFormElement.querySelector("#subtitle");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileImageElement = document.querySelector(".profile__image");
const profileImage = profileImageElement.querySelector(".profile__pic");

/*////////////////////////////////////////////////////////////////////
/                         Form Validation                            /
////////////////////////////////////////////////////////////////////*/

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/*////////////////////////////////////////////////////////////////////
/                         Page Load                                  /
////////////////////////////////////////////////////////////////////*/

let cardSection;
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__subtitle",
  userImageSelector: ".profile__pic",
  userId: "",
});

//refactor to use loadPageContent (promise.all method)
// api
//   .loadPageContent()
//   .then(([cards, userData]) => {
//     cardSection = new Section(
//       {
//         items: cards,
//         renderer: renderCard,
//       },
//       ".location__cards"
//     );

//     cardSection.renderItems();

//     userInfo.setUserInfo({
//       name: userData["name"],
//       info: userData["about"],
//       image: userData["avatar"],
//       id: userData["_id"],
//     });
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   });

//old code that individually loads page elements--this works but doesn't use promise all
api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".location__cards"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

api
  .getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((res) => {
    userInfo.setUserInfo({
      name: res["name"],
      info: res["about"],
      image: res["avatar"],
      id: res["_id"],
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

/*////////////////////////////////////////////////////////////////////
/                         Event Listeners                            /
////////////////////////////////////////////////////////////////////*/

addLocationButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-location-form"].resetValidation();
});

editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfileName.value = userData.name;
  editProfileSubtitle.value = userData.info;
  formValidators["edit-profile-form"].resetValidation();
  profilePopup.open();
});

profileImageElement.addEventListener("click", () => {
  imageChangePopup.open();
});

/*////////////////////////////////////////////////////////////////////
/                      Popups                                        /
////////////////////////////////////////////////////////////////////*/

const viewImagePopup = new PopupWithImage(".view-image-popup");
const confirmDeletePopup = new PopupWithForm({
  popupSelector: ".delete-card-popup",
  handleFormSubmit: () => {
    deleteCard(cardElement);
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".add-card-popup",
  handleFormSubmit: (formData) => {
    addCardPopup.setSavingMessage();
    api
      .addCard(formData)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        renderCard(data);
        addCardPopup.close();
        addCardPopup.resetSubmitMessage("Create");
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: () => {
    const data = {
      name: editProfileName.value,
      about: editProfileSubtitle.value,
    };
    profilePopup.setSavingMessage();
    api
      .updateUserInfo(data)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        userInfo.setUserInfo({
          name: res["name"],
          info: res["about"],
          image: res["avatar"],
          id: res["_id"],
        });
        profilePopup.close();
        profilePopup.resetSubmitMessage("Save");
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

const imageChangePopup = new PopupWithForm({
  popupSelector: ".profile-image-popup",
  handleFormSubmit: (formData) => {
    imageChangePopup.setSavingMessage();
    api
      .updateUserImage(formData["profile-image"])
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        imageChangePopup.close();
        console.log("updating image");
        profileImage.src = res.avatar;
        imageChangePopup.resetSubmitMessage("Save");
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

/*////////////////////////////////////////////////////////////////////
/                         Cards                                      /
////////////////////////////////////////////////////////////////////*/

const likeCard = (card) => {
  api
    .likeCard(card)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

const unlikeCard = (card) => {
  api
    .unlikeCard(card)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

let cardElement;
const confirmDelete = (card) => {
  confirmDeletePopup.open();
  cardElement = card;
};

const deleteCard = (card) => {
  confirmDeletePopup.setSavingMessage();
  api
    .deleteCard(card._cardId)
    .then((res) => {
      if (res.ok) {
        card.removeCard();
        confirmDeletePopup.close();
        confirmDeletePopup.resetSubmitMessage("Yes");
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

const renderCard = (item) => {
  const card = new Card(
    item,
    ".card-template",
    () => {
      viewImagePopup.open({ image: item["link"], title: item["name"] });
    },
    confirmDelete,
    likeCard,
    unlikeCard
  );
  cardSection.addItem(card.generateCard());
};
