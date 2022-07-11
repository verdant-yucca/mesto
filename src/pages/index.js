import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  selectorBtnEditProfile,
  selectorBtnAddCards,
  selectorPopupImageFullscreen,
  selectorPopupAddCards,
  selectorPopupEditProfile,
  selectorFormPopupEditProfile,
  selectorFormPopupAddCards,
  selectorInputNamePopupEditProfile,
  selectorInputInfoPopupEditProfile,
  config
} from "../utils/constants.js";

// функция создания карточки
function createNewCard(data, cardSelector) {
    const card = new Card(data, cardSelector, {handleCardClick: () => {
      popupWithImage.open(data);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// экземпляр класса PopupWithForm = ПП добавления карточки
const popupAddCards = new PopupWithForm(selectorPopupAddCards, handleNewCardSubmit);
popupAddCards.setEventListeners();

// вешаем слушатель на кнопку Добавить карточку
selectorBtnAddCards.addEventListener('click', () => {
  popupAddCards.open();
  newCardFormValidator.resetValidation();
});

// функция добавления карточки пользователем
function handleNewCardSubmit({ name, info }) {
  const obj = {
    name: name,
    link: info
  };
  cardsList.addItem(createNewCard(obj, '#element'), false);
};

// экземпляр класса PopupWithImage = ПП с картинкой фуллскрин
const popupWithImage = new PopupWithImage(selectorPopupImageFullscreen);
popupWithImage.setEventListeners();

// получаем данные профиля для передачи в ПП
function handleUserInfo(data) {
  userInfo.getUserInfo(data);
}

// экземпляр класса PopupWithForm = ПП редактирования профиля
const popupEdit = new PopupWithForm(selectorPopupEditProfile, handleUserInfo);
popupEdit.setEventListeners();

// экземпляр класса UserInfo = управление отображением информации о пользователе
const userInfo = new UserInfo('.profile__profile-name', '.profile__profile-info');

// вешаем слушатель на кнопку редактирования профиля
selectorBtnEditProfile.addEventListener('click', () => {
  popupEdit.open();
  const getInfo = userInfo.getUserInfo();
  selectorInputNamePopupEditProfile.value = getInfo.name;
  selectorInputInfoPopupEditProfile.value = getInfo.info;
  profileFormValidator.resetValidation();
});


// экземпляр класса FormValidator = валидация формы редактирование профиля
const profileFormValidator = new FormValidator(config, selectorFormPopupEditProfile);
profileFormValidator.enableValidation();

// экземпляр класса FormValidator = валидация формы добавления карточки
const newCardFormValidator = new FormValidator(config, selectorFormPopupAddCards);
newCardFormValidator.enableValidation();

// добавление карточек из массива элементов при загрузке страницы
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    cardsList.addItem(createNewCard(cardItem, '#element'), true);
  }
},'.elements');
cardsList.renderItems();
