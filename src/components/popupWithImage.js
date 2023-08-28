import  Popup  from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, openingSelector, btns, form, link, name) {
        super(popupSelector, openingSelector, btns, form);
        this._link = link;
        this._name = name;
    }

    open(htmlLink, htmlName) {
        htmlLink.src = this._link;
        htmlName.textContent = this._name;
        htmlLink.alt = this._name;
        super.open();
    }
}
