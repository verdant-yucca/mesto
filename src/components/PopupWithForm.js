import { Popup } from "./Popup.js";

//класс PopupWithForm, который наследует от Popup. Для ПП с формой и сабмитом
class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__edit');
    this._inputValues = this._form.querySelectorAll('.popup__input');
    this._submitForm = submitForm;
  }

  close() {
    super.close();
    this._form.reset();
  }

  //приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const inputObject = {};
    this._inputValues.forEach(item => {
      inputObject[item.name] = item.value;
    });
    return inputObject;
  }

  // публичный метод setEventListeners, который добавляет
  // слушатель клика иконке закрытия попапа + обработчик сабмита формы
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}

export { PopupWithForm };
