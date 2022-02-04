class ValidateForm {
  constructor(config, _formSelector) {
    this._formSelector = _formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  };

  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  //проверяем каждое поле на валидность
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //если невалидно - true, иначе - false
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
}

  //деактивируем кнопку, если есть невалидные поля
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  //перебираем поля формы
  _setEventListeners = (_formSelector) => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //проходим по всем формам
  enableValidation = () => {
    this._formSelector.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  };
}

export { ValidateForm };
