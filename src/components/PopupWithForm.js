import { Popup } from "./Popup.js";

//класс PopupWithForm, который наследует от Popup. Для ПП с формой и сабмитом
class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__edit');
    this._inputValues = this._form.querySelectorAll('.popup__input');
    this._submitForm = submitForm;
    this._buttonSave = this._popupElement.querySelector('.popup__button-save');
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputObject = {};
    this._inputValues.forEach(item => {
      inputObject[item.name] = item.value;
    });
    return inputObject;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      // this.close();
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSaveText = this._buttonSave.textContent;
      this._buttonSave.textContent = 'Сохранение...';
    }
    else {
      this._buttonSave.textContent = this._buttonSaveText;
    }
  }
}

export { PopupWithForm };
