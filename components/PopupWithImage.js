import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }

  open({ image, title }) {
    //need to populate the image, src, and alt title for popup from card selected but with loose coupling
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupTitle = this._popupElement.querySelector(".modal__title_image");
    this._popupImage.src = image;
    this._popupImage.alt = `Photo of ${title}`;
    this._popupTitle.textContent = title;

    super.open();
  }
}
