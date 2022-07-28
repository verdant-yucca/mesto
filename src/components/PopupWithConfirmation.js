import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__edit');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm();
    });
    super.setEventListeners();
  }

  submitForm(submitForm) {
    this._submitForm = submitForm;
  }
}

export { PopupWithConfirmation };
