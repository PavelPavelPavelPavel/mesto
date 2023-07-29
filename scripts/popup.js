export class Popup {
    constructor(popupSelector, openingSelector, btns, form) {
        this._popupSelector = popupSelector;
        this._openingSelector = openingSelector;
        this._btns = btns;
        this._form = form;
    }

    open() {
        this._popupSelector.classList.add(this._openingSelector);
        document.addEventListener("keydown",  this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove(this._openingSelector);
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
    
    this._btns.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            const item = evt.target.closest(".popup");
            item.classList.remove(this._openingSelector);
            this.close();
        });
    });
    }
}