export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._cardTitle = data.name;
    this._cardImage = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return _cardElement;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };
  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);

    this._likeButton.addEventListener("click", this._handleLike);

    this._deleteButton.addEventListener("click", this._handleDelete);
  }

  generateCard() {
    //add event listeners
    this._element = this._getTemplate();

    this._element.querySelector(".card__title").textContent = this._cardTitle;
    this._cardPicture = this._element.querySelector(".card__image");
    this._cardPicture.src = this._cardImage;
    this._cardPicture.alt = `Photo of ${this._cardTitle}`;

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._setEventListeners();

    return this._element;
  }
}
