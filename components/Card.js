const viewImageModal = document.querySelector("#view-image");
const modalImage = document.querySelector(".modal__image");
const modalTitleImage = document.querySelector(".modal__title_image");

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._cardTitle = data.title;
    this._cardImage = data.image;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return _cardElement;
  }

  _setEventListeners() {
    // open card via click listener
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenModal();
      });

    // like
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    //delete
    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  _handleOpenModal() {
    //set modal contents
    modalImage.src = this._cardImage;
    modalImage.alt = `Photo of ${this._cardTitle}`;
    modalTitleImage.textContent = this._cardTitle;
    viewImageModal.classList.add("modal_opened");
    //close on escape
    document.addEventListener("keydown", this._closeModalOnEsc);
  }

  _closeModalOnEsc(evt) {
    if (evt.key === "Escape") {
      viewImageModal.classList.remove("modal_opened");
    }
  }

  generateCard() {
    //add event listeners
    this._element = this._getTemplate();

    this._element.querySelector(".card__title").textContent = this._cardTitle;
    this._element.querySelector(".card__image").src = this._cardImage;
    this._element.querySelector(
      ".card__image"
    ).alt = `Photo of ${this._cardTitle}`;

    this._setEventListeners();

    return this._element;
  }
}
