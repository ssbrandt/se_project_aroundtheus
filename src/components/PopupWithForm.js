import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = document.querySelector(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues = () => {
    const formList = new FormData(this._popupForm);
    const formObject = Object.fromEntries(formList);
    return formObject;
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = this._getInputValues();
    this._handleFormSubmit(formData);
  };

  setSavingMessage = () => {
    this.submitButton = this._popupForm.querySelector(".form__submit");
    this.submitButton.textContent = "Saving...";
  };

  resetSubmitMessage = (message) => {
    this.submitButton.textContent = message;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this.handleFormSubmit);
  }

  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this.handleFormSubmit);
    super.close();
  }
}
