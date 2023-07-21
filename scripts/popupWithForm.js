import { Popup } from "./popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
    }

    _getImputValues() {

    }

    _setEventListeners() {
        super._setEventListeners();

    }

    close() {
        super.close();
        
    }

}