import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup, openingSelector) {
        super(popup, openingSelector);
        this._link = document.querySelector(".popup__img");
        this._caption = document.querySelector(".popup__caption");
    }

    open(link, name) {
        this._link.src = link;
        this._link.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}
