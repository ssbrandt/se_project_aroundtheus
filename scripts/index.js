const cards = [
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

const profileName = document.querySelector(".profile__name").textContent;
const profileSubtitle =
  document.querySelector(".profile__subtitle").textContent;
const formElement = document.querySelector("#edit-modal-form");
const editProfileName = formElement.querySelector("#name");
const editProfileSubtitle = formElement.querySelector("#subtitle");
const profileEdit = document.querySelector(".modal");
const closeProfileButton = profileEdit.querySelector(".modal__button-close");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile");

//open and close Profile Edit prepopulating with page data
function openProfileEdit() {
  editProfileName.value = profileName;
  editProfileSubtitle.value = profileSubtitle;
  editProfileModal.classList.add("modal_opened");
}
editProfileButton.addEventListener("click", openProfileEdit);

function closeProfileEdit() {
  editProfileModal.classList.remove("modal_opened");
}
closeProfileButton.addEventListener("click", closeProfileEdit);

//handle updating profile localy

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__name").textContent = editProfileName.value;
  document.querySelector(".profile__subtitle").textContent =
    editProfileSubtitle.value;

  closeProfileEdit();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//handle existing cards

const cardList = document.querySelector(".location__cards");

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = `Photo of ${data.name}`;
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

  return cardElement;
}

cards.forEach(function (item) {
  cardList.append(getCardElement(item));
});

//add image modal opening and closing

const addImageModal = document.querySelector("#add-image");
const addLocationButton = document.querySelector(".profile__add-button");
const closeLocationButton = document.querySelector("#close-add-location");

function openAddLocation() {
  addImageModal.classList.add("modal_opened");
}
addLocationButton.addEventListener("click", openAddLocation);

function closeAddLocation() {
  addImageModal.classList.remove("modal_opened");
}

closeLocationButton.addEventListener("click", closeAddLocation);

//user added cards

function handleLocationFormSubmit(evt) {
  evt.preventDefault();
  const locationTitle = document.querySelector("#location-title").value;
  const locationURL = document.querySelector("#image-link").value;
  const cardElement = getCardElement({
    name: locationTitle,
    link: locationURL,
  });
  cardList.prepend(cardElement);
  closeAddLocation();
}

const locationFormElement = document.querySelector("#location-modal-form");
locationFormElement.addEventListener("submit", handleLocationFormSubmit);
