import { Popup } from "./Popup.js";

//класс PopupWithImage перезаписывает open() и передаёт в ПП ссылку и описание картинки
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgPopupWithImage = this._popupSelector.querySelector('.popup__image');
    this._titlePopupWithImage = this._popupSelector.querySelector('.popup__image-text');
  }

  open({ name, link }) {
    super.open();
    this._imgPopupWithImage.src = link;
    this._imgPopupWithImage.alt = name;
    this._titlePopupWithImage.textContent = name;
  }
}

export { PopupWithImage };

