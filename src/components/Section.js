//отрисовка элементов на странице
class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //принимает параметр DOM-element и вставляет его в контейнер
  addItem(element, isAppend) {
    if (isAppend) {
      this._container.append(element);
    }
    else {this._container.prepend(element);}
  }

  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}

export { Section };
