import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
import {
  selectorPopupImageFullscreen,
  selectorPopupAddCards,
  selectorPopupEditProfile,
  selectorPopupAvatar,
  selectorPopupConfirm,
  selectorFildsProfile,
  elementButtonEditProfile,
  elementButtonAddCards,
  elementFormPopupAddCards,
  elementFormPopupEditProfile,
  elementFormPopupAvatar,
  elementInputNamePopupEditProfile,
  elementInputInfoPopupEditProfile,
  elementAvatarProfile,
  config,
  formValidators
} from "../utils/constants.js";

let userId = null;

// управление отображением информации о пользователе
const userInfo = new UserInfo(selectorFildsProfile);

//#region загрузка данных на старте
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'cc57414f-37f0-4296-8799-a8484f2a34e6',
    'Content-Type': 'application/json'
  }
});

api.getAppInfo()
.then(([data, cards]) => {
  userId = data._id;
  userInfo.setUserInfo(data);
  cardsList.renderItems(cards);
})
.catch(err => {
  console.log(`Ошибка: ${err}`);
});

const cardsList = new Section({
  renderer: (data) => {
    cardsList.addItem(createNewCard(data, '#element'), true);
  }
}, '.elements');
//#endregion

//#region создание карточки
function createNewCard(data, cardSelector) {
  const card = new Card(data, cardSelector, userId,
    {
      handleCardClick: () => {
        popupWithImage.open(data);
      }
    },{
      deleteCard: (elementCard) => {
        const cardId = card.getCardId();
        popupConfirm.submitForm(() => {
          api.deleteCard(cardId)
          .then(() => {
            elementCard.remove();
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`);
          });
        });
        popupConfirm.open();
      }
    },{
      addLike: () => {
        const cardId = card.getCardId();
        api.addLike(cardId)
        .then(res => {
          card.addCardLike(res.likes.length);
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        });
      }
    },{
      deleteLike: () => {
        const cardId = card.getCardId();
        api.deleteLike(cardId)
        .then(res => {
          card.deleteCardLike(res.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
};

function handleNewCardSubmit({ name, info }) {
  popupAddCards.renderLoading(true);
  api.addCard(name, info)
    .then(data => {
      cardsList.addItem(createNewCard(data, '#element'), false);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddCards.renderLoading(false);
      popupAddCards.close();
    });
};

const popupAddCards = new PopupWithForm(selectorPopupAddCards, handleNewCardSubmit);
popupAddCards.setEventListeners();

const popupWithImage = new PopupWithImage(selectorPopupImageFullscreen);
popupWithImage.setEventListeners();

const popupConfirm = new PopupWithConfirmation(selectorPopupConfirm);
popupConfirm.setEventListeners();

elementButtonAddCards.addEventListener('click', () => {
  popupAddCards.open();
  formValidators[elementFormPopupAddCards.getAttribute('name')].resetValidation();
});
//#endregion

//#region валидация всех форм
const enableValidation = (config) => {
  const formArr = Array.from(document.querySelectorAll(config.formSelector))
  formArr.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    const form = formElement.getAttribute('name');
    formValidators[form] = formValidator;
    formValidator.enableValidation();
  });
};
enableValidation(config);
//#endregion

//#region редактирование профиля
function handleUserInfo(data) {
  popupEditProfile.renderLoading(true);
  api.editProfile(data)
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupEditProfile.renderLoading(false);
    popupEditProfile.close();
  });
}

const popupEditProfile = new PopupWithForm(selectorPopupEditProfile, handleUserInfo);
popupEditProfile.setEventListeners();

elementButtonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  const { name, info } = userInfo.getUserInfo();
  elementInputNamePopupEditProfile.value = name;
  elementInputInfoPopupEditProfile.value = info;
  formValidators[elementFormPopupEditProfile.getAttribute('name')].resetValidation();
});
//#endregion

//#region изменение аватарки пользователя
const handleAvatarEdit = ({ url }) => {
  popupAvatar.renderLoading(true);
  api.editAvatar(url)
  .then(res => {
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupAvatar.renderLoading(false);
    popupAvatar.close();
  });
}

const popupAvatar = new PopupWithForm(selectorPopupAvatar, handleAvatarEdit);
popupAvatar.setEventListeners();

elementAvatarProfile.addEventListener('click', () => {
  popupAvatar.open();
  formValidators[elementFormPopupAvatar.getAttribute('name')].resetValidation();
});
//#endregion
