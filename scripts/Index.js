
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";

//фуллскрин
const popupImageFullscreen = document.querySelector('.popup_type_image-fullscreen');
const btnClosePpImageFullscreen = popupImageFullscreen.querySelector('.popup__button-close');
const imageFullscreen = popupImageFullscreen.querySelector('.popup__image');
const titleFullscreen = popupImageFullscreen.querySelector('.popup__image-text');

//карточки
const elementsCards = document.querySelector('.elements');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const formAddNewCard = popupAddCards.querySelector('.popup__edit');
const photoNameInput = popupAddCards.querySelector('.popup__input_profile_name');
const photoSrcInput = popupAddCards.querySelector('.popup__input_profile_info');
const btnClosepopupAddCards = popupAddCards.querySelector('.popup__button-close');

//профиль
const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__button-edit');
const btnAdd = profile.querySelector('.profile__button-add');
const name = profile.querySelector('.profile__profile-name');
const info = profile.querySelector('.profile__profile-info');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__edit');
const inputProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const inputProfileInfo = popupEditProfile.querySelector('.popup__input_profile_info');
const btnClosePopupProfile = popupEditProfile.querySelector('.popup__button-close');

const config = {
  formSelector: '.popup__edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

//#region функции окрытия и закрытия попапа

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
};
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupOverlay);
};

//функция закрыпия попапа по Esc и по нажатию на Overlay
function closePopupOverlay(e) {
  if  (e.target.classList.contains('popup_active')) {
    const popupOpened = document.querySelector('.popup_active');
    closePopup(popupOpened);
  }
}

//функция закрыпия попапа по Esc и по нажатию на Overlay
function closePopupEsc(e) {
  if (e.key==='Escape') {
    const popupOpened = document.querySelector('.popup_active');
    closePopup(popupOpened);
  }
}

//#endregion

//#region попап изменения имени и инфо профиля
//создание экземпляров класса FormValidator
const profileFormValidator = new FormValidator(config, formEditProfile);
profileFormValidator.enableValidation();

btnEdit.addEventListener('click', () => {
  inputProfileName.value = name.textContent;
  inputProfileInfo.value = info.textContent;
  openPopup(popupEditProfile);
  profileFormValidator.resetValidation();
});

//закрыть пп
function closePopupEditProfile() {
  closePopup(popupEditProfile);
}
btnClosePopupProfile.addEventListener('click', closePopupEditProfile);

//применить изменения и закрыть пп
function handleProfileSubmit(e) {
  e.preventDefault();
  name.textContent = inputProfileName.value;
  info.textContent = inputProfileInfo.value;
  closePopupEditProfile();
}
formEditProfile.addEventListener('submit', handleProfileSubmit);
//#endregion

//#region добавление карточки
const newCardFormValidator = new FormValidator(config, formAddNewCard);
newCardFormValidator.enableValidation();

// создание клона карточки
function createNewCard(data, cardSelector) {
  const card = new Card(data, cardSelector, openPopupImageFullscreen);
  const cardImage = card.generateCard();
  return cardImage;
};

//открытие попапа с картинкой для класса Card
function openPopupImageFullscreen(name, link) {
  imageFullscreen.src = link;
  imageFullscreen.alt = name;
  titleFullscreen.textContent = name;
  openPopup(popupImageFullscreen);
};

btnClosePpImageFullscreen.addEventListener('click', () => {
  closePopup(popupImageFullscreen);
});

//добавление карточек из массива
initialCards.forEach((item) => {
  elementsCards.append(createNewCard (item, '#element'));
});

// открыть пп
btnAdd.addEventListener('click', () => {
  openPopup(popupAddCards);
  newCardFormValidator.resetValidation();
});

//функция добавления карточки
function handleNewCardSubmit (e) {
  e.preventDefault();
  const obj =
    {
      name: photoNameInput.value,
      link: photoSrcInput.value
    }
    elementsCards.prepend(createNewCard (obj, '#element'));
    formAddNewCard.reset();
  closePopup(popupAddCards);
}
formAddNewCard.addEventListener('submit', handleNewCardSubmit);

//закрыть пп добавления карточки
btnClosepopupAddCards.addEventListener('click', () => {
  closePopup(popupAddCards);
});

//#endregion