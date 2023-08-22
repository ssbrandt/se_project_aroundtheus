import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = document.querySelector(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputObj = {};
    const inputs = Array.from(this._popupForm.querySelectorAll(".form__input"));
    inputs.forEach(
      (input) => (inputObj[input.id] = this._popupForm[input.value])
    );
    return inputObj;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
