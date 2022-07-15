import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  elementButtonEditProfile,
  elementButtonAddCards,
  selectorPopupImageFullscreen,
  selectorPopupAddCards,
  selectorPopupEditProfile,
  elementFormPopupAddCards,
  elementFormPopupEditProfile,
  elementInputNamePopupEditProfile,
  elementInputInfoPopupEditProfile,
  selectorFildsProfile,
  config
} from "../utils/constants.js";

// функция создания карточки
function createNewCard(data, cardSelector) {
    const card = new Card(data, cardSelector, () => {
      popupWithImage.open(data);
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// экземпляр класса PopupWithForm = ПП добавления карточки
const popupAddCards = new PopupWithForm(selectorPopupAddCards, handleNewCardSubmit);
popupAddCards.setEventListeners();

// вешаем слушатель на кнопку Добавить карточку
elementButtonAddCards.addEventListener('click', () => {
  popupAddCards.open();
  newCardFormValidator.resetValidation();
});

// функция добавления карточки пользователем
function handleNewCardSubmit({ name, info }) {
  const data = {
    name: name,
    link: info
  };
  cardsList.addItem(createNewCard(data, '#element'), false);
};

// экземпляр класса PopupWithImage = ПП с картинкой фуллскрин
const popupWithImage = new PopupWithImage(selectorPopupImageFullscreen);
popupWithImage.setEventListeners();

// получаем данные профиля для передачи в ПП
function handleUserInfo(data) {
  userInfo.setUserInfo(data);
}

// экземпляр класса PopupWithForm = ПП редактирования профиля
const popupEdit = new PopupWithForm(selectorPopupEditProfile, handleUserInfo);
popupEdit.setEventListeners();

// экземпляр класса UserInfo = управление отображением информации о пользователе
const userInfo = new UserInfo(selectorFildsProfile);

// вешаем слушатель на кнопку редактирования профиля
elementButtonEditProfile.addEventListener('click', () => {
  popupEdit.open();
  const { name, info } = userInfo.getUserInfo();
  elementInputNamePopupEditProfile.value = name;
  elementInputInfoPopupEditProfile.value = info;
  profileFormValidator.resetValidation();
});


// экземпляр класса FormValidator = валидация формы редактирование профиля
const profileFormValidator = new FormValidator(config, elementFormPopupEditProfile);
profileFormValidator.enableValidation();

// экземпляр класса FormValidator = валидация формы добавления карточки
const newCardFormValidator = new FormValidator(config, elementFormPopupAddCards);
newCardFormValidator.enableValidation();

// добавление карточек из массива элементов при загрузке страницы
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    cardsList.addItem(createNewCard(cardItem, '#element'), true);
  }
},'.elements');
cardsList.renderItems();
