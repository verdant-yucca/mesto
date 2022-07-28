import { Popup } from "./Popup.js";

class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__edit');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm();
      this.close();
    });
    super.setEventListeners();
  }

  submitForm(submitForm) {
    this._submitForm = submitForm;
  }
}

export { PopupConfirm };
