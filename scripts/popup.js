export class Popup {
    constructor(popupSelector, openingSelector, btns) {
        this._popupSelector = popupSelector;
        this._openingSelector = openingSelector;
        this._btns = btns;
    }

    open() {
        this._popupSelector.classList.add(this._openingSelector);

    }

    close() {
        this._popupSelector.classList.remove(this._openingSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
           this.close();
    }
}

    setEventListeners() {

        this._popupSelector.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
        }});

        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
    })

    this._btns.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            const item = evt.target.closest(".popup");
            item.classList.remove(this._openingSelector)
        });
    });
    }
}