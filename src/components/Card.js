class Card {
  constructor(data, cardSelector, openImageFullscreen) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openImageFullscreen = openImageFullscreen;
  }

  //клонируем карточку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  //переключатель лайка вкл/выкл
  _toggleLike() {
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  //удаление карточки
  _deleteElement () {
    this._element.remove();
    this._element = null;
  }

  //вешаем слушатели событий на лайк, картинку, кнопку удалить
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._deleteElement();
    });
    this._elementImage.addEventListener('click', () => {
      this._openImageFullscreen(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__element-info');
    this._setEventListeners();
    this._elementTitle.textContent = this._name;
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    return this._element;
  }
}

export { Card };
