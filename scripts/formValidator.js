class FormValidator {
<<<<<<< HEAD
   constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
||||||| 5e93ef8
  constructor(validationConfig, form) {
      this._validationConfig = validationConfig;
      this._form = form;
      this._formsList = Array.from(document.querySelectorAll(this._validationConfig.form));
      this._inputsList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
      this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
      this._inputsErrorSpan = Array.from(document.querySelectorAll(".popup__error"));
  }
=======
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._inputsList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
        this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._inputsErrorSpan = Array.from(document.querySelectorAll(".popup__error"));
    }
>>>>>>> main

<<<<<<< HEAD
   }
||||||| 5e93ef8
  enableValidation() {
      this._formsList.forEach((form) => {
          form.addEventListener("submit", (evt) => {
              evt.preventDefault();
          });
          this._setEventListeners();
      });
  }
=======
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
>>>>>>> main

<<<<<<< HEAD
enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.form));
    formList.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault(); 
        });
        this._setEventListeners(); 
    });
   }
||||||| 5e93ef8
  clearingErrorInSpan() {
      this._inputsErrorSpan.forEach((span) => {
          span.textContent = "";
      });
      this._inputsList.forEach((input) => {
          input.classList.remove(this._validationConfig.inputErrorClass);
      });
  }
=======
    clearingErrorInSpan() {
        this._inputsList.forEach((input) => {
            this._hideInputError(input);
        });
    }
>>>>>>> main

<<<<<<< HEAD
   _handleInputsList() {
    Array.from(form.querySelectorAll(validationConfig.inputSelector));
||||||| 5e93ef8
  _showInputError(inputValue) {
      const errorElement = document.querySelector(`#${inputValue.id}-error`);
      inputValue.classList.add(this._validationConfig.inputErrorClass);
      errorElement.textContent = inputValue.validationMessage;
      errorElement.classList.add(this._validationConfig.errorClass);
  }
=======
    _showInputError(inputValue) {
        const errorElement = document.querySelector(`#${inputValue.id}-error`);
        inputValue.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputValue.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    }
>>>>>>> main

<<<<<<< HEAD
   }
||||||| 5e93ef8
  _hideInputError(inputValue) {
      const errorElement = document.querySelector(`#${inputValue.id}-error`);
      inputValue.classList.remove(this._validationConfig.inputErrorClass);
      errorElement.textContent = "";
  }
=======
    _hideInputError(inputValue) {
        const errorElement = document.querySelector(`#${inputValue.id}-error`);
        inputValue.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.textContent = "";
    }
>>>>>>> main

<<<<<<< HEAD
   _setEventListeners()  {
||||||| 5e93ef8
  _checkInputValidity(inputValue) {
      if (!inputValue.validity.valid) {
          this._showInputError(inputValue);
      } else {
          this._hideInputError(inputValue);
      }
  }
=======
    _checkInputValidity(inputValue) {
        if (!inputValue.validity.valid) {
            this._showInputError(inputValue);
        } else {
            this._hideInputError(inputValue);
        }
    }
>>>>>>> main

<<<<<<< HEAD
   }
||||||| 5e93ef8
  _hasInvalidInput() {
      return this._inputsList.some((input) => {
          return !input.validity.valid;
      });
  }
=======
    _hasInvalidInput() {
        return this._inputsList.some((input) => {
            return !input.validity.valid;
        });
    }
>>>>>>> main

<<<<<<< HEAD
   _showInputError() {
||||||| 5e93ef8
  _toggleButtonState() {
      if (this._hasInvalidInput()) {
          this.disableSubmitButton();
      } else {
          this.enableSubmitButton();
      }
  }
=======
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }
>>>>>>> main

<<<<<<< HEAD
   }
||||||| 5e93ef8
  disableSubmitButton() {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._validationConfig.disabledButtonClass);
  }
=======
    disableSubmitButton() {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add(this._validationConfig.disabledButtonClass);
    }
>>>>>>> main

<<<<<<< HEAD
   _hideInputError() {
||||||| 5e93ef8
  enableSubmitButton() {
      this._submitButton.classList.remove(this._validationConfig.disabledButtonClass);
      this._submitButton.removeAttribute("disabled");
  }
=======
    enableSubmitButton() {
        this._submitButton.classList.remove(this._validationConfig.disabledButtonClass);
        this._submitButton.removeAttribute("disabled");
    }
>>>>>>> main

<<<<<<< HEAD
   }
||||||| 5e93ef8
  formReset() {
      this._form.reset();
  }
=======
    resetForm() {
        this._form.reset();
    }
>>>>>>> main

<<<<<<< HEAD
   _checkInputValidity() {

   }

   _hasInvalidInput() {

   }

   _toggleButtonState() {
    
   }
   
||||||| 5e93ef8
  _setEventListeners() {
      this._inputsList.forEach((inputValue) => {
          inputValue.addEventListener("input", () => {
              this._toggleButtonState();
              this._checkInputValidity(inputValue);
          });
      });
  }
=======
    _setEventListeners() {
        this._inputsList.forEach((inputValue) => {
            inputValue.addEventListener("input", () => {
                this._toggleButtonState();
                this._checkInputValidity(inputValue);
            });
        });
    }
>>>>>>> main
}

/////////////////////////////////////////////////
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.form));
    formList.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault(); //отменяем стандартную отправку формы
        });
        setEventListeners(form, validationConfig); //навешиваем на каждую форму слушатели на поля и кнопки
    });
  };
  //показ ошибок
  //аргументы( form(получаем из checkInputValidity ))
  //         inputValut(получаем из checkInputValidity)
  //           validationConfig(получаем из checkInputValidity))
  // передается в checkInputValidity
  const showInputError = (form, inputValue, validationConfig) => {
    const errorElement = form.querySelector(`#${inputValue.id}-error`); //ищем span c ошибкой
    inputValue.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = inputValue.validationMessage; //присваиванм значение span (текст ошибки от браузера)
    errorElement.classList.add(validationConfig.errorClass); //меняем стили инпута
  };
  //выключаем показ ошибок
  //аргументы( form(получаем из checkInputValidity ))
  //         inputValut(получаем из checkInputValidity)
  //           validationConfig(получаем из checkInputValidity))
  // передается в checkInputValidity
  const hideInputError = (form, inputValue, validationConfig) => {
    const errorElement = form.querySelector(`#${inputValue.id}-error`); //ищем span c ошибкой
    inputValue.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = "";
  };
  
  //слушатели на поля и кнопки
  //аргументы(form (получаем из forEach EnableValidation))
  //           (validationConfig из enableValidation)
  //передается в ebableValidation
  const setEventListeners = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputValue) => {
        // пробегаемся по полям формы
        inputValue.addEventListener("input", () => {
            //навещиваем слушатель событий на инпуты
            checkInputValidity(form, inputValue, validationConfig); //проверяем инпут на соответствие требования валидации
            toggleButtonState(inputList, submitButton, validationConfig); //навевшиваем на тнпут проверку для активации кнопки
        });
    });
  };
  //Валидация полей
  //аргументы( form(получаем из setEventListener ))
  //         inputValut(получаем из setEveneListener)
  //           validationConfig(получаем из setEventListener))
  //передаеися в setEventListener
  const checkInputValidity = (form, inputValue, validationConfig) => {
    if (!inputValue.validity.valid) {
        showInputError(form, inputValue, validationConfig);
    } else {
        hideInputError(form, inputValue, validationConfig);
    }
  };
  //проверка полей на валидность
  //аргумент (inputList- массив полей(определен в setEventListener))
  //передается в toggleButtonState  для проверки валидности поля
  function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid; // ищем неваоидный инпут
    });
  }
  //меняем состояние кнопки в зависимости от результата работы функции hasInvalidInput
  //аргументы функции(inputList-массив полей(определен в setEventListener),
  //submitButton - кнопка(определен в setEventListener)
  //validationConfig - массив классов)
  //передается в setEventListener для каждой формы
  function toggleButtonState(inputList, submitButton, validationConfig) {
    if (hasInvalidInput(inputList)) {
        // проверяем поле на валидность
        addClassButton(submitButton, validationConfig);
    } else {
        removeClassButton(submitButton, validationConfig)
    }
  }
  
  function addClassButton(submitButton, validationConfig) {
        submitButton.setAttribute("disabled", true);
        submitButton.classList.add(validationConfig.disabledButtonClass);
  }
  
  function removeClassButton(submitButton, validationConfig) {
    submitButton.classList.remove(validationConfig.disabledButtonClass);
    submitButton.removeAttribute("disabled");
  }
export { FormValidator,  enableValidation, addClassButton, removeClassButton };