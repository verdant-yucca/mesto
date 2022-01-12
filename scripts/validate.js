//снять ошибку при закрытии
function hideError(){
  const popupOpened = document.querySelector('.popup_active');

  const inputList = Array.from(popupOpened.querySelectorAll('.popup__text_type_error'));

  if (inputList.length!==0) {
    const errorList = Array.from(popupOpened.querySelectorAll('.popup__error_active'));

    inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__text_type_error');
    });

    errorList.forEach((errorElement) => {
      errorElement.classList.remove('popup__error_active');
      errorElement.textContent = '';
    });
  }
};

//кнопка при открытии
function toggleButton(){
  const popupOpened = document.querySelector('.popup_active');
  const inputList = Array.from(popupOpened.querySelectorAll('.popup__input'));

  if (inputList.length!==0) {
    const buttonElement = popupOpened.querySelector('.popup__button-save');
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_disabled');
    }
    else {
      buttonElement.classList.remove('popup__button-save_disabled');
    }
  }
};

//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
 };

//снять ошибку
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//проверка на валидность каждого поля формы
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//есть ли хотя бы одно поле невалидно
//если есть - true, если нет - false
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//если хотя бы одно поле невалидно - сделать кнопку неактивной, иначе - активной
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

//проходим по всем полям формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//проходим по всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

//config
enableValidation({
  formSelector: '.popup__edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
});
