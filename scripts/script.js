
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//для создания элемента
const elementsCards = document.querySelector('.elements');
const templateCard = document.querySelector('#element').content;

//для увеличения фото
const popupImageFullscreen = document.querySelector('.popup_type_image-fullscreen');
const btnClosePpImageFullscreen = popupImageFullscreen.querySelector('.popup__button-close');
const imageFullscreen = popupImageFullscreen.querySelector('.popup__image');
const titleFullscreen = popupImageFullscreen.querySelector('.popup__image-text');

const popupAddKards = document.querySelector('.popup_type_add-kards');
const submitPopupAddKards = popupAddKards.querySelector('.popup__edit');
const photoNameInput = popupAddKards.querySelector('.popup__input_profile_name');
const photoSrcInput = popupAddKards.querySelector('.popup__input_profile_info');
const btnClosePopupAddKards = popupAddKards.querySelector('.popup__button-close');
const btnSavePopupAddKards = popupAddKards.querySelector('.popup__button-save');

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__button-edit');
const btnAdd = profile.querySelector('.profile__button-add');
const name = profile.querySelector('.profile__profile-name');
const info = profile.querySelector('.profile__profile-info');
const ppEditProfile = document.querySelector('.popup_type_edit-profile');
const fieldsEdit = ppEditProfile.querySelector('.popup__edit');
const editName = ppEditProfile.querySelector('.popup__input_profile_name');
const editInfo = ppEditProfile.querySelector('.popup__input_profile_info');
const btnClose = ppEditProfile.querySelector('.popup__button-close');

//#region попап изменения имени и инфо профиля
// открыть пп
function openPopupEditProfile() {
  editName.value = name.textContent;
  editInfo.value = info.textContent;
  ppEditProfile.classList.add('popup_active');
}
btnEdit.addEventListener('click', openPopupEditProfile);

//закрыть пп
function closePopuoEditProfile() {
  ppEditProfile.classList.remove('popup_active');
}
btnClose.addEventListener('click', closePopuoEditProfile);

//применить изменения и закрыть пп
function SubmitPopupEditProfile(e) {
  e.preventDefault();
  name.textContent = editName.value;
  info.textContent = editInfo.value;
  closePopuoEditProfile();
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
		popupImageFullscreen.classList.add('popup_active');
		imageFullscreen.src = link;
		titleFullscreen.textContent = name;
	});
  btnClosePpImageFullscreen.addEventListener('click', () => {
    popupImageFullscreen.classList.remove('popup_active');
  });
	return card;
}

//добавление карточек из массива
initialCards.forEach(card => {
	elementsCards.append(createNewCard (card.name, card.link));
});

// открыть пп
btnAdd.addEventListener('click', () => {
  popupAddKards.classList.add('popup_active');
  photoNameInput.value = '';
	photoSrcInput.value = '';
});

//функция добавления карточки
function addPhotoElement (e) {
	e.preventDefault();
	elementsCards.prepend(createNewCard (photoNameInput.value, photoSrcInput.value));
	popupAddKards.classList.remove('popup_active');
}
submitPopupAddKards.addEventListener('submit', addPhotoElement);

//закрыть пп добавления карточки
btnClosePopupAddKards.addEventListener('click', () => {
  popupAddKards.classList.remove('popup_active');
});
//#endregion
