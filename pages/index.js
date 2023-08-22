import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";
import UserInfo from "/components/UserInfo.js";
import PopupWithImage from "/components/PopupWithImage.js";
import PopupWithForm from "/components/PopupWithForm.js";
import Section from "/components/Section.js";

//set initial set of cards

const initialCards = [
  {
    title: "Washington DC",
    image:
      "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
  },

  {
    title: "Charlottesville",
    image:
      "https://images.unsplash.com/photo-1625685124246-529a036f3142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    title: "Rhode Island",
    image:
      "https://images.unsplash.com/photo-1579379498402-48d6751d1ae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=739&q=80",
  },

  {
    title: "Blue Ridge Mountains",
    image:
      "https://images.unsplash.com/photo-1603670849273-deb4670aa548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80",
  },

  {
    title: "Cape Cod",
    image:
      "https://images.unsplash.com/photo-1516400691782-ad921bc57267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=376&q=80",
  },
  {
    title: "Harrisonburg VA",
    image:
      "https://images.unsplash.com/photo-1657567384402-b9918d5fd7b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
];

//commenting out while working on classes
// function renderCard(cardData) {
//   const newCard = new Card(cardData, ".card-template");
//   return newCard.generateCard();
// }

// //render initial Cards
// const cardList = document.querySelector(".location__cards");
// initialCards.forEach(function (cardData) {
//   const newCard = renderCard(cardData);
//   cardList.append(newCard);
// });

const addImageModal = document.querySelector("#add-image");
const addLocationButton = document.querySelector(".profile__add-button");
const locationFormElement = document.forms["add-location-form"];

const locationTitle = document.querySelector("#location-title");
const locationURL = document.querySelector("#image-link");

locationFormElement.addEventListener("submit", handleLocationFormSubmit);

addLocationButton.addEventListener("click", () => {
  openModal(addImageModal);
});

function handleLocationFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = renderCard({
    title: locationTitle.value,
    image: locationURL.value,
  });
  cardList.prepend(cardElement);
  locationFormElement.reset();
  formValidators["add-location-form"].resetValidation();

  closeModal(addImageModal);
}

//modal function and event handlers

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEsc);
}

const modals = Array.from(document.querySelectorAll(".modal"));

//commenting out for pop up class
// modals.forEach((modal) => {
//   const closeButton = modal.querySelector(".modal__button-close");
//   modal.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("modal_opened") &&
//       !evt.target.closest(".modal__container")
//     ) {
//       closeModal(modal);
//     }
//   });
//   closeButton.addEventListener("click", () => {
//     closeModal(modal);
//   });
// });

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error-message_active",
};

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

//refactor to card and pop-up classes

const viewImagePopup = new PopupWithImage(".view-image-popup");

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", () => {
        viewImagePopup.open({ image: item.image, title: item.title });
      });
      cardSection.addItem(card.generateCard());
    },
  },
  ".location__cards"
);

cardSection.renderItems();

//refactor profile edit to use classes

//new User Info

const profileFormElement = document.forms["edit-profile-form"];
const editProfileName = profileFormElement.querySelector("#name");
const editProfileSubtitle = profileFormElement.querySelector("#subtitle");
const editProfileModal = document.querySelector("#edit-profile");

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__subtitle",
});

function populateEditProfileModal() {
  const userData = userInfo.getUserInfo();
  //will need to replace this with the _getInputValues method and use those values, but working for now
  editProfileName.value = userData.name.textContent;
  editProfileSubtitle.value = userData.info.textContent;
}

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({
      name: editProfileName.value,
      info: editProfileSubtitle.value,
    });
    profilePopup.close();
  },
});

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
  populateEditProfileModal();
  formValidators["edit-profile-form"].resetValidation();
  profilePopup.open();
});

//add location
