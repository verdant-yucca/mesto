
import { ValidateForm } from "./validate.js";
import { InitialCards } from "./initial-сards.js";
import { Card } from "./cards.js";

//фуллскрин
const popupImageFullscreen = document.querySelector('.popup_type_image-fullscreen');
const btnClosePpImageFullscreen = popupImageFullscreen.querySelector('.popup__button-close');
const imageFullscreen = popupImageFullscreen.querySelector('.popup__image');
const titleFullscreen = popupImageFullscreen.querySelector('.popup__image-text');

//карточки
const elementsCards = document.querySelector('.elements');
const popupAddKards = document.querySelector('.popup_type_add-kards');
const btnSubmitPopupAddСards = popupAddKards.querySelector('.popup__edit');
const photoNameInput = popupAddKards.querySelector('.popup__input_profile_name');
const photoSrcInput = popupAddKards.querySelector('.popup__input_profile_info');
const btnClosePopupAddKards = popupAddKards.querySelector('.popup__button-close');

//профиль
const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__button-edit');
const btnAdd = profile.querySelector('.profile__button-add');
const name = profile.querySelector('.profile__profile-name');
const info = profile.querySelector('.profile__profile-info');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const fieldsEdit = popupEditProfile.querySelector('.popup__edit');
const editName = popupEditProfile.querySelector('.popup__input_profile_name');
const editInfo = popupEditProfile.querySelector('.popup__input_profile_info');
const btnClose = popupEditProfile.querySelector('.popup__button-close');

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
const profileFormValidator = new ValidateForm(config, fieldsEdit);
profileFormValidator.enableValidation();

// изменить пп редактирования
function openPopupEditProfile(e) {
  e.preventDefault();
  editName.textContent = name.value;
  editInfo.textContent = info.value;
}
btnEdit.addEventListener('click', openPopupEditProfile);

btnEdit.addEventListener('click', () => {
  name.value = editName.textContent;
  info.value = editInfo.textContent;
  openPopup(popupEditProfile);
  profileFormValidator.resetValidation();
});

//закрыть пп
function closePopupEditProfile() {
  closePopup(popupEditProfile);
}
btnClose.addEventListener('click', closePopupEditProfile);

//применить изменения и закрыть пп
function SubmitPopupEditProfile(e) {
  e.preventDefault();
  name.textContent = editName.value;
  info.textContent = editInfo.value;
  closePopupEditProfile();
}
fieldsEdit.addEventListener('submit', SubmitPopupEditProfile);
//#endregion

//#region добавление карточки
const newCardFormValidator = new ValidateForm(config, btnSubmitPopupAddСards);
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
InitialCards.forEach((item) => {
  elementsCards.append(createNewCard (item, '#element'));
});

// открыть пп
btnAdd.addEventListener('click', () => {
  openPopup(popupAddKards);
  newCardFormValidator.resetValidation();
});

//функция добавления карточки
function addPhotoElement (e) {
  e.preventDefault();
  const obj =
    {
      name: photoNameInput.value,
      link: photoSrcInput.value
    }
    elementsCards.prepend(createNewCard (obj, '#element'));
    btnSubmitPopupAddСards.reset();
  closePopup(popupAddKards);
}
btnSubmitPopupAddСards.addEventListener('submit', addPhotoElement);

//закрыть пп добавления карточки
btnClosePopupAddKards.addEventListener('click', () => {
  closePopup(popupAddKards);
});

//#endregion
