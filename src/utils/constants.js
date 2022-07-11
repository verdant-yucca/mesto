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
export const selectorPopupImageFullscreen = document.querySelector('.popup_type_image-fullscreen');

//ПП Добавление карточек
export const selectorPopupAddCards = document.querySelector('.popup_type_add-cards');
export const selectorFormPopupAddCards = selectorPopupAddCards.querySelector('.popup__edit');

//Профиль
const profile = document.querySelector('.profile');
export const selectorBtnEditProfile = profile.querySelector('.profile__button-edit');
export const selectorBtnAddCards = profile.querySelector('.profile__button-add');

//ПП Изменение профиля
export const selectorPopupEditProfile = document.querySelector('.popup_type_edit-profile');
export const selectorFormPopupEditProfile = selectorPopupEditProfile.querySelector('.popup__edit');
export const selectorInputNamePopupEditProfile = selectorPopupEditProfile.querySelector('.popup__input_profile_name');
export const selectorInputInfoPopupEditProfile = selectorPopupEditProfile.querySelector('.popup__input_profile_info');

export const config = {
  formSelector: '.popup__edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};
