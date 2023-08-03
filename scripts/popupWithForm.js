import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, openingSelector, btns, form, inputs, handleFormSubmit) {
        super(popupSelector, openingSelector, btns, form);
        this._inputs = inputs;
        this._inputsList = Array.from(this._form.querySelectorAll(this._inputs));
        this._handleFormSubmit = handleFormSubmit;
        this._onSubmit = this._onSubmit.bind(this);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        return this._formValues; //возвращаем полученный объект
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._onSubmit);
        console.log(this);
    }

    _onSubmit(evt) {
        evt.preventDefault();

        this._handleFormSubmit(this._getInputValues());
        this.close();
    }

    close() {
        this._form.removeEventListener("submit", this._onSubmit);
        this._form.reset();
        super.close();
    }
}
