import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";

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

const renderCard = (item) => {
  const card = new Card(item, ".card-template", () => {
    viewImagePopup.open({ image: item.image, title: item.title });
  });
  cardSection.addItem(card.generateCard());
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".location__cards"
);

cardSection.renderItems();

//Profile functionality

const profileFormElement = document.forms["edit-profile-form"];
const editProfileName = profileFormElement.querySelector("#name");
const editProfileSubtitle = profileFormElement.querySelector("#subtitle");

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__subtitle",
});

//new
const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      name: editProfileName.value,
      info: editProfileSubtitle.value,
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
