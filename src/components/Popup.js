class Popup {
  //Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //публичный метод open, который отвечает за открытие попапа.
  open() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //публичный метод close, который отвечает за закрытие попапа.
  close() {
    this._popupElement.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // приватный метод _handleEscClose, который содержит
  // логику закрытия попапа клавишей Esc.
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // публичный метод setEventListeners, который добавляет
  // слушатель клика иконке закрытия попапа. Модальное окно также
  // закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });
  }
}

export { Popup };
