class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector); //Вычислю контейнер здесь, чтобы не вычислять его каждую итерацию метода
  }

  //Публичный метод рендера всех элементов на странице
  renderElements () {
    //Каждый элемент рендерим на странице функцией обратного вызова, куда передаём элемент, а назад получаем рендер
    this._items.forEach(item => {
      this._renderedItem = this._renderer(item, this._containerSelector); //Передаем карточки и селектор контейнера в коллбэк для добавления в разметку
    })
  }

  //Публичный метод рендера одного элемента, принимает дом элемент
  addItem (domElement) {
    this._container.append(domElement); //Добавляем дом элемент на страницу
  }
}

export default Section; //Экспортируем класс
