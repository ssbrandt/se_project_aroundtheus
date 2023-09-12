export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    deleteHandler,
    likeHandler,
    unlikeHandler
  ) {
    this._cardSelector = cardSelector;
    this._cardTitle = data.name;
    this._cardImage = data.link;
    this.cardId = data["_id"];
    this.isLiked = data["isLiked"];
    this._handleCardClick = handleCardClick;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._unlikeHandler = unlikeHandler;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return _cardElement;
  }

  _handleLike = () => {
    if (this.isLiked) {
      this._unlikeHandler(this);
    } else {
      this._likeHandler(this);
    }
  };

  addLike() {
    this._likeButton.classList.add("card__like-button_active");
    this.isLiked = true;
  }

  removeLike() {
    this._likeButton.classList.remove("card__like-button_active");
    this.isLiked = false;
  }

  _handleDelete = () => {
    this._deleteHandler(this);
  };

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardPicture.addEventListener("click", this._handleCardClick);

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
    if (this.isLiked) {
      this.addLike();
    }
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._setEventListeners();

    return this._element;
  }
}
