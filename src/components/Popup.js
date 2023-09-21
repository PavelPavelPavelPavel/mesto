export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._openingSelector = "popup_opened";
        this._btn = this._popup.querySelector(".popup__button-close");
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleBtnCrossClose = this._handleBtnCrossClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.classList.add(this._openingSelector);
    }

    close() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._popup.classList.remove(this._openingSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleBtnCrossClose() {
        this.close();
    }

    setEventListeners() {
       
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._btn.addEventListener("click", this._handleBtnCrossClose);
    }
}
