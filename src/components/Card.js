export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._cardTitle = data.title;
    this._cardImage = data.image;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return _cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);

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

  generateCard() {
    //add event listeners
    this._element = this._getTemplate();

    this._element.querySelector(".card__title").textContent = this._cardTitle;
    this._cardPicture = this._element.querySelector(".card__image");
    this._cardPicture.src = this._cardImage;
    this._cardPicture.alt = `Photo of ${this._cardTitle}`;

    this._setEventListeners();

    return this._element;
  }
}