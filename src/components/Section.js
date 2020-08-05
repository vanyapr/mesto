class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  //Приватный метод поиска контейнера для рендера
  _findContainer () {
    this.container = document.querySelector(this._containerSelector);
    return this.container;
  }

  //публичный метод рендера всех элементов
  renderElements () {
    const container = this._findContainer();

    //Каждый элемент рендерим в функции обратного вызова
    this._items.forEach(item => {
      const renderedItem = this._renderer(item);
      container.append(renderedItem);
    })
  }

  //публичный метод рендера одного элемента
  addItem (domElement) {
    const container = this._findContainer();
    container.append(domElement);
  }

}
