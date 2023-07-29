import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, openingSelector, btns, form, inputs, handleFormSubmit) {
        super(popupSelector, openingSelector, btns, form);
        this._inputs = inputs;
        this._inputsList = Array.from(this._form.querySelectorAll(this._inputs));
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() { // не понимаю как использовать полученные инпуты
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;// создаем объект из значений полей 
        })                                             // конкретной формы
        return this._formValues;//возвращаем полученный объект
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", evt => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());//подстакляем в переданную форму 
            this.close();                                 // значения inputs
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    getInput() {
        console.log(this._getInputValues())
    }
    
}