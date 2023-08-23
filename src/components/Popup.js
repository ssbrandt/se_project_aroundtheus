export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__button-close"
    );
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleCloseOnClick = (evt) => {
    if (
      evt.target.classList.contains("modal_opened") &&
      !evt.target.closest(".modal__container")
    ) {
      this.close();
    }
  };

  _handleCloseButton = () => {
    this.close();
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleCloseOnClick);
    this._closeButton.addEventListener("click", this._handleCloseButton);
  }

  removeEventListeners() {
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleCloseOnClick
    );
    this._closeButton.removeEventListener("click", this._handleCloseButton);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this.removeEventListeners();
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
