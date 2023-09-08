import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

//api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "92a79377-2ddd-47c9-b759-a9f13176876d",
    "Content-Type": "application/json",
  },
});

//form validations

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

//Card functionality

const viewImagePopup = new PopupWithImage(".view-image-popup");

//new code for rendering initial cards
let cardSection;

////new delete card functionality
const deleteCard = (card) => {
  api
    .deleteCard(card)
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
};

const renderCard = (item) => {
  const card = new Card(
    item,
    ".card-template",
    () => {
      viewImagePopup.open({ image: item["link"], title: item["name"] });
    },
    deleteCard,
    likeCard,
    unlikeCard
  );
  cardSection.addItem(card.generateCard());
};

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
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

//Profile functionality

const profileFormElement = document.forms["edit-profile-form"];
const editProfileName = profileFormElement.querySelector("#name");
const editProfileSubtitle = profileFormElement.querySelector("#subtitle");

//update profile data to use API calls

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__subtitle",
  userImageSelector: ".profile__pic",
  userId: "",
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

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: () => {
    const data = {
      name: editProfileName.value,
      about: editProfileSubtitle.value,
    };
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
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfileName.value = userData.name;
  editProfileSubtitle.value = userData.info;
  formValidators["edit-profile-form"].resetValidation();
  profilePopup.open();
});

//add new card

const addCardPopup = new PopupWithForm({
  popupSelector: ".add-card-popup",
  handleFormSubmit: (formData) => {
    api
      .addCard(formData)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        renderCard(data);
        addCardPopup.close();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

const addLocationButton = document.querySelector(".profile__add-button");

addLocationButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-location-form"].resetValidation();
});

//like and unlike handler functions

const likeCard = (card) => {
  api
    .likeCard(card)
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
};

const unlikeCard = (card) => {
  api
    .unlikeCard(card)
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
};

//add event handler for image change popup

const profileImage = document.querySelector(".profile__pic");

const imageChangePopup = new PopupWithForm({
  popupSelector: ".profile-image-popup",
  handleFormSubmit: (formData) => {
    //need to add call here
    api
      .updateUserImage(formData["profile-image"])
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        imageChangePopup.close();
        profileImage.src = res.avatar;
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  },
});

profileImage.addEventListener("click", () => {
  imageChangePopup.open();
});
