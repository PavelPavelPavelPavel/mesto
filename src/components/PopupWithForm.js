import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, form, inputSelector, handleFormSubmit) {
    super(popup);
    this._form = form;
    this._inputSelector = inputSelector;
    this._inputsList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitBtn = this._form.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
    this._onSubmit = this._onSubmit.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._onSubmit);
  }

  resetBtnSubmit(btnText) {
    this._submitBtn.textContent = `${btnText}`;
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this._submitBtn.textContent = "Сохранение...";
  }

  close() {
    this._form.reset();
    super.close();
  }
}
