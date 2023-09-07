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

const renderCard = (item) => {
  const card = new Card(item, ".card-template", () => {
    viewImagePopup.open({ image: item["link"], title: item["name"] });
  });
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

api.getUserInfo().then((res) => {
  userInfo.setUserInfo({
    name: res["name"],
    info: res["about"],
    image: res["avatar"],
    id: res["_id"],
  });
});

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: () => {
    const data = {
      name: editProfileName.value,
      about: editProfileSubtitle.value,
    };
    api.updateUserInfo(data).then((res) => {
      userInfo.setUserInfo({
        name: res["name"],
        info: res["about"],
        image: res["avatar"],
        id: res["_id"],
      });
    });
    profilePopup.close();
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
    renderCard(formData);
    addCardPopup.close();
  },
});

const addLocationButton = document.querySelector(".profile__add-button");

addLocationButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-location-form"].resetValidation();
});

//let's test the API class

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "92a79377-2ddd-47c9-b759-a9f13176876d",
//     "Content-Type": "application/json",
//   },
// });

//card stuff

// const card = {
//   name: "New Card",
//   link: "https://images.unsplash.com/photo-1528629297340-d1d466945dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlraW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
// };

// api.getInitialCards();
// api.unlikeCard("64f8f7deef16d0001aca53c4");
// api.addCard(card);
// api.deleteCard("6a0d44142523c6a486e53f3f");
//user stuff

// console.log(api.getUserInfo());
// const data = { name: "New Name", about: "new description" };
// api.updateUserInfo(data);
// api.updateUserImage(
//   "https://images.unsplash.com/photo-1528629297340-d1d466945dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlraW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
// );
// console.log(api.getUserInfo());
