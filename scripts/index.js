//set initial set of cards

const initialCards = [
  {
    name: "Washington DC",
    link: "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
  },

  {
    name: "Charlottesville",
    link: "https://images.unsplash.com/photo-1625685124246-529a036f3142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Rhode Island",
    link: "https://images.unsplash.com/photo-1579379498402-48d6751d1ae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=739&q=80",
  },

  {
    name: "Blue Ridge Mountains",
    link: "https://images.unsplash.com/photo-1603670849273-deb4670aa548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80",
  },

  {
    name: "Cape Cod",
    link: "https://images.unsplash.com/photo-1516400691782-ad921bc57267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=376&q=80",
  },
  {
    name: "Harrisonburg VA",
    link: "https://images.unsplash.com/photo-1657567384402-b9918d5fd7b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
];

// storing relevant DOM elements
// const profileName = document.querySelector(".profile__name").textContent;
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormElement = document.querySelector("#edit-modal-form");
const editProfileName = profileFormElement.querySelector("#name");
const editProfileSubtitle = profileFormElement.querySelector("#subtitle");
const editProfileModal = document.querySelector("#edit-profile");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__button-close"
);
const editProfileButton = document.querySelector(".profile__edit-button");

const cardList = document.querySelector(".location__cards");
const addImageModal = document.querySelector("#add-image");
const addLocationButton = document.querySelector(".profile__add-button");
const closeLocationButton = document.querySelector("#close-add-location");
const locationFormElement = document.querySelector("#location-modal-form");
const viewImageModal = document.querySelector("#view-image");
const closeViewImageModalButton = document.querySelector(
  "#close-view-location"
);

//helper functions

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function populateEditProfileModal() {
  editProfileName.value = profileName.textContent;
  editProfileSubtitle.value = profileSubtitle.textContent;
}
//event handlers
editProfileButton.addEventListener("click", () => {
  populateEditProfileModal();
  openModal(editProfileModal);
});

closeProfileButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

locationFormElement.addEventListener("submit", handleLocationFormSubmit);

closeViewImageModalButton.addEventListener("click", () => {
  closeModal(viewImageModal);
});

addLocationButton.addEventListener("click", () => {
  openModal(addImageModal);
});

closeLocationButton.addEventListener("click", () => {
  closeModal(addImageModal);
});

//handle cards

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  const newCardTitle = cardElement.querySelector(".card__title");
  const newCardImage = cardElement.querySelector(".card__image");
  newCardTitle.textContent = data.name;
  newCardImage.src = data.link;
  newCardImage.alt = `Photo of ${data.name}`;

  //add likeButton event handler
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //add deleteButton event handler
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    const cardItem = deleteButton.closest(".card");
    cardItem.remove();
  });

  //add view image modal

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    document.querySelector(".modal__image").src = data.link;
    document.querySelector(".modal__image").alt = `Photo of ${data.name}`;
    document.querySelector(".modal__title_image").textContent = data.name;
    openModal(viewImageModal);
  });

  return cardElement;
}

initialCards.forEach(function (item) {
  cardList.append(getCardElement(item));
});

//form submission

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileSubtitle.textContent = editProfileSubtitle.value;
  closeModal(editProfileModal);
}

function handleLocationFormSubmit(evt) {
  evt.preventDefault();
  const locationTitle = document.querySelector("#location-title").value;
  const locationURL = document.querySelector("#image-link").value;
  const cardElement = getCardElement({
    name: locationTitle,
    link: locationURL,
  });
  cardList.prepend(cardElement);
  locationFormElement.reset();
  closeModal(addImageModal);
}

//handle form validation

//specifically handling edit profile modal
// const formElement = document.querySelector("#edit-modal-form");
// const formInput = formElement.querySelector(".form__input");
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// console.log(formElement);
// console.log(formInput);
// console.log(formError);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error-message_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input-error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error-message_active");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// formElement.addEventListener("submit", (evt) => {
//   evt.preventDefault();
// });

// formElement.addEventListener("input", checkInputValidity);

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
