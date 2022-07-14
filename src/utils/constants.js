export const initialCards = [
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

//ПП Изображение фуллскрин
export const selectorPopupImageFullscreen = '.popup_type_image-fullscreen';

//ПП Добавление карточек
export const selectorPopupAddCards = '.popup_type_add-cards';
export const elementFormPopupAddCards =
  document.
  querySelector('.popup_type_add-cards').
  querySelector('.popup__edit');

//Профиль
const profile = document.querySelector('.profile');
export const elementButtonEditProfile = profile.querySelector('.profile__button-edit');
export const elementButtonAddCards = profile.querySelector('.profile__button-add');
export const selectorFildsProfile = {
  nameProfileSelector: '.profile__profile-name',
  infoProfileSelector: '.profile__profile-info'
};
export const selectorPopupEditProfile = '.popup_type_edit-profile';
const elementPopupEditProfile = document.querySelector('.popup_type_edit-profile');
export const elementFormPopupEditProfile = elementPopupEditProfile.querySelector('.popup__edit');
export const elementInputNamePopupEditProfile = elementPopupEditProfile.querySelector('.popup__input_profile_name');
export const elementInputInfoPopupEditProfile = elementPopupEditProfile.querySelector('.popup__input_profile_info');

export const config = {
  formSelector: '.popup__edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};
