//отрисовка элементов на странице
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
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
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

export { Section };
