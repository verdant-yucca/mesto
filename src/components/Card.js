class Card {
  constructor(data, cardSelector, userId, { handleCardClick }, { deleteCard }, { addLike }, { deleteLike }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
  }

  getCardId() {
    return this._id;
  }

  _getTemplate() {
    const userElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return userElement;
  }

  _toggleLike() {
    if (this._buttonLike.classList.contains('element__button-like_active')) {
      this._deleteLike();
    }
    else {
      this._addLike();
    }
  }

  deleteCard(elementCard) {
    elementCard.remove();
  };

  addCardLike(counter) {
    this._buttonLike.classList.add('element__button-like_active');
    this._counter.textContent = counter;
  };

  deleteCardLike(counter) {
    this._buttonLike.classList.remove('element__button-like_active');
    this._counter.textContent = counter;
  };

  _isOwnerLike() {
    if (this._likes.length !== 0) {
        this._likes.forEach(owner => {
          if (this._userId === owner._id) this._buttonLike.classList.add('element__button-like_active');
        })
    }
  };

  _setCountLike() {
    this._counter.textContent = this._likes.length;
  };

  _isOwnerCard() {
    if (this._userId === this._owner._id) {
        this._buttonDelete.classList.add('element__delete_active');
    };
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard(this._element);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._counter = this._element.querySelector('.element__like-counter');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._setCountLike();
    this._isOwnerLike();
    this._isOwnerCard();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__element-info');
    this._setEventListeners();
    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._element.id = this._id;
    return this._element;
  }
}

export { Card };
