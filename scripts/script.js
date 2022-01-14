//фуллскрин
const popupImageFullscreen = document.querySelector('.popup_type_image-fullscreen');
const btnClosePpImageFullscreen = popupImageFullscreen.querySelector('.popup__button-close');
const imageFullscreen = popupImageFullscreen.querySelector('.popup__image');
const titleFullscreen = popupImageFullscreen.querySelector('.popup__image-text');

//карточки
const elementsCards = document.querySelector('.elements');
const templateCard = document.querySelector('#element').content;
const popupAddKards = document.querySelector('.popup_type_add-kards');
const btnSubmitPopupAddСards = popupAddKards.querySelector('.popup__edit');
const photoNameInput = popupAddKards.querySelector('.popup__input_profile_name');
const photoSrcInput = popupAddKards.querySelector('.popup__input_profile_info');
const btnClosePopupAddKards = popupAddKards.querySelector('.popup__button-close');
const btnSavePopupAddKards = popupAddKards.querySelector('.popup__button-save');

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
  if (evt.key==='Escape') {
    const popupOpened = document.querySelector('.popup_active');
    closePopup(popupOpened);
  }
}

//#endregion

//#region попап изменения имени и инфо профиля
// открыть пп
function openPopupEditProfile() {
  editName.value = name.textContent;
  editInfo.value = info.textContent;
  openPopup(popupEditProfile);
  hideError(popupEditProfile);
  toggleButton(popupEditProfile);
}
btnEdit.addEventListener('click', openPopupEditProfile);

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
// создание клона карточки
function createNewCard(name, link) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardUrl = card.querySelector('.element__element-info');
  cardImage.src = link;
  cardImage.alt = name;
  cardUrl.textContent = name;
  card.querySelector('.element__delete').addEventListener('click', () => {
    card.remove();
  });
  card.querySelector('.element__button-like').addEventListener('click', e => {
    e.target.classList.toggle('element__button-like_active');
  });
  cardImage.addEventListener('click', () => {
    openPopup(popupImageFullscreen);
    imageFullscreen.src = link;
    titleFullscreen.textContent = name;
    cardImage.alt = name;
  });
  return card;
};

btnClosePpImageFullscreen.addEventListener('click', () => {
  closePopup(popupImageFullscreen);
});

//добавление карточек из массива
initialCards.forEach(card => {
  elementsCards.append(createNewCard (card.name, card.link));
});

// открыть пп
btnAdd.addEventListener('click', () => {
  photoNameInput.value = '';
  photoSrcInput.value = '';
  openPopup(popupAddKards);
  hideError(popupAddKards);
  toggleButton(popupAddKards);
});

//функция добавления карточки
function addPhotoElement (e) {
  e.preventDefault();
  elementsCards.prepend(createNewCard (photoNameInput.value, photoSrcInput.value));
  closePopup(popupAddKards);
}
btnSubmitPopupAddСards.addEventListener('submit', addPhotoElement);

//закрыть пп добавления карточки
btnClosePopupAddKards.addEventListener('click', () => {
  closePopup(popupAddKards);
});

//#endregion

//снять ошибку при закрытии
function hideError(popupOpened){
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
function toggleButton(popupOpened){
  const inputList = Array.from(popupOpened.querySelectorAll('.popup__input'));
  if (inputList.length!==0) {
    const buttonElement = popupOpened.querySelector('.popup__button-save');
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_disabled');
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove('popup__button-save_disabled');
      buttonElement.disabled = false;
    }
  }
};
