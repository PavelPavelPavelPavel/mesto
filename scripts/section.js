export  class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedCards = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedCards.forEach(item => {
            this._renderer(item)
        })
    }

    addItem(element) {
        this._container.prepend(element)
    }
}