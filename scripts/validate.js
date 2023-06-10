//включаем валидацию
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
      //console.log(inputList)
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
export { enableValidation, addClassButton, removeClassButton };
