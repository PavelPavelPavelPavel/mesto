class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._inputsList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._inputsErrorSpan = Array.from(document.querySelectorAll(".popup__error"));
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    clearingErrorInSpan() {
        this._inputsList.forEach((input) => {
            this._hideInputError(input);
        });
    }

    _showInputError(inputValue) {
        const errorElement = document.querySelector(`#${inputValue.id}-error`);
        inputValue.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputValue.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    }

    _hideInputError(inputValue) {
        const errorElement = document.querySelector(`#${inputValue.id}-error`);
        inputValue.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputValue) {
        if (!inputValue.validity.valid) {
            this._showInputError(inputValue);
        } else {
            this._hideInputError(inputValue);
        }
    }

    _hasInvalidInput() {
        return this._inputsList.some((input) => {
            return !input.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }

    disableSubmitButton() {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._validationConfig.disabledButtonClass);
    }

    enableSubmitButton() {
        this._submitButton.classList.remove(this._validationConfig.disabledButtonClass);
        this._submitButton.removeAttribute("disabled");
    }

    resetForm() {
        this._form.reset();
    }

    _setEventListeners() {
        this._inputsList.forEach((inputValue) => {
            inputValue.addEventListener("input", () => {
                this._toggleButtonState();
                this._checkInputValidity(inputValue);
            });
        });
    }
}

export { FormValidator };
