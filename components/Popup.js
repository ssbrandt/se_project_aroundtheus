export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log("escape!!!!");
      console.log(this);
      // this.querySelector(".modal_opened").classList.remove("modal_opened");
      // this.querySelector(".modal_opened").close();

      // this._popupElement.close();
    }
  }

  _setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".modal__button-close"
    );
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") &&
        !evt.target.closest(".modal__container")
      ) {
        this.close();
      }
    });
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._setEventListeners();
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("close");
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
