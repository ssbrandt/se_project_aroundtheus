class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // this.clear();

    this._items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
