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
api
  .loadPageContent()
  .then(([cards, userData]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".location__cards"
    );

    cardSection.renderItems();

    userInfo.setUserInfo(userData);
  })
  .catch(console.error);

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
  formValidators["edit-image-profile-form"].resetValidation();
});

/*////////////////////////////////////////////////////////////////////
/                      Popups                                        /
////////////////////////////////////////////////////////////////////*/

const viewImagePopup = new PopupWithImage(".view-image-popup");
const confirmDeletePopup = new PopupWithForm({
  popupSelector: ".delete-card-popup",
  handleFormSubmit: () => {
    deleteCard(cardToDelete);
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".add-card-popup",
  handleFormSubmit: (formData) => {
    addCardPopup.renderLoading(true);
    api
      .addCard(formData)
      .then((data) => {
        renderCard(data);
        addCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  },
});

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: (formData) => {
    profilePopup.renderLoading(true);
    api
      .updateUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePopup.close();
      })
      .catch(console.error)
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});
//continue here with render loading
const imageChangePopup = new PopupWithForm({
  popupSelector: ".profile-image-popup",
  handleFormSubmit: (formData) => {
    imageChangePopup.renderLoading(true);
    api
      .updateUserImage(formData["profile-image"])
      .then((res) => {
        imageChangePopup.close();
        userInfo.setUserImage(res.avatar);
      })
      .catch(console.error)
      .finally(() => {
        imageChangePopup.renderLoading(false);
      });
  },
});

/*////////////////////////////////////////////////////////////////////
/                         Cards                                      /
////////////////////////////////////////////////////////////////////*/

const likeCard = (card) => {
  api
    .likeCard(card.cardId)
    .then(() => {
      card.addLike();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

const unlikeCard = (card) => {
  api
    .unlikeCard(card.cardId)
    .then(() => {
      card.removeLike();
    })
    .catch(console.error);
};

let cardToDelete;
const confirmDelete = (card) => {
  confirmDeletePopup.open();
  cardToDelete = card;
};

const deleteCard = (card) => {
  confirmDeletePopup.renderLoading(true);
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.removeCard();
      confirmDeletePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      confirmDeletePopup.renderLoading(false);
    });
};

function createCard(item) {
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

  return card.generateCard();
}

const renderCard = (item) => {
  const card = createCard(item);
  cardSection.addItem(card);
};
