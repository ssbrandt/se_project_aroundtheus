let initialCards = [
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
    link: "https://images.unsplash.com/photo-1516400691782-ad921bc57267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=376&q=80",
  },
];

// Open modal on edit button click
const editProfileButton = document.querySelector(".profile__edit-button");

function openProfileEdit() {
  const editModal = document.querySelector(".modal");
  editModal.classList.add("modal_opened");
}
editProfileButton.addEventListener("click", openProfileEdit);

// close modal on close click

const closeProfileButton = document.querySelector(".modal__button-close");

function closeProfileEdit() {
  const editModal = document.querySelector(".modal");
  editModal.classList.remove("modal_opened");
}
closeProfileButton.addEventListener("click", closeProfileEdit);

//set value of profile name and subtitle to equal page value

let profileName = document.querySelector(".profile__name").textContent;
let profileSubtitle = document.querySelector(".profile__subtitle").textContent;

let editProfileName = document.querySelector("#name");
editProfileName.value = profileName;

let editProfileSubtitle = document.querySelector("#subtitle");
editProfileSubtitle.value = profileSubtitle;
