export class Popup {
    constructor(popupSelector, openingSelector, btns, form) {
        this._popupSelector = popupSelector;
        this._openingSelector = openingSelector;
        this._btns = btns;
        this._form = form;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleBtnCrossClose = this._handleBtnCrossClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popupSelector.classList.add(this._openingSelector);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupSelector.classList.remove(this._openingSelector);
        this._btns.forEach((btn) => {
            btn.removeEventListener("click", this._handleBtnCrossClose);
        });
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleBtnCrossClose(evt) {
        const item = evt.target.closest(".popup");
        item.classList.remove(this._openingSelector);
        this.close();
    }

    setEventListeners() {
        this._popupSelector.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._btns.forEach((btn) => {
            btn.addEventListener("click", this._handleBtnCrossClose);
        });
    }
}
