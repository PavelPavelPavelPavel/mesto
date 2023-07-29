import { initialCards, validationConfig } from "./data.js";
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { Section } from "./section.js";
import { Popup } from "./popup.js";
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";

const formElementProfile = document.querySelector(".popup__form_edit_profile");
const formElementCard = document.querySelector(".popup__form_edit_cards");

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_job");

// Выбираем поля с именем и профессией
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__work");
//Находим popups
const popupEditForm = document.querySelector(".popup_edit_form");
const popupEditCards = document.querySelector(".popup_edit_cards");
const popupOpenImg = document.querySelector(".popup_edit_img");
const popupCaption = document.querySelector(".popup__caption");
const popupImgFullSize = document.querySelector(".popup__img");
//находим все кнопки в node и делаем массив
const buttonsClose = Array.from(document.querySelectorAll(".popup__button-close"));
// Находим кнопку открытия popup и добавления карточки
const btnOpenProfile = document.querySelector(".profile__button");
const btnOpenCard = document.querySelector(".profile__add-button");

//формы
const formCard = document.getElementById("card");
const formProfile = document.getElementById("profile");
const formImage = document.getElementById("image");
const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);
const cardForm = new PopupWithForm(popupEditCards, "popup_opened", buttonsClose, formCard, '.popup__value', handleFormCardSubmit);
const profileForm = new PopupWithForm(popupEditForm, "popup_opened", buttonsClose, formProfile, '.popup__value', handleFormProfileSubmit);

//принимает массив с карточками - data
function initRenderCard (data, containerSelector = '.elements') {
    const defaultCard = new Section({
        items: data, //массив с карточками
        renderer: (item) => {// функция  создания карточки
          const card =  new Card(item, '.template', openPopupImg);
          const cardElement = card.generateCard();
          defaultCard.addItem(cardElement);
        }}, containerSelector);
        defaultCard.renderItems();//??
    }
// функция открытия popup`s
function openPopupProfile() {
    profileForm.open();
    profileForm.setEventListeners();
    
    profileValidity.enableValidation();
    profileValidity.clearingErrorInSpan();
    profileValidity.enableSubmitButton();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopupCard() {
    cardForm.open();
    cardForm.setEventListeners();
    cardValidity.enableValidation();
    cardValidity.clearingErrorInSpan();
    cardValidity.disableSubmitButton();
}


function openPopupImg(link, name) {
    const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened", buttonsClose, formImage, link, name);
    imgPopup.open(popupImgFullSize, popupCaption);
    imgPopup.setEventListeners();
}

//открываем popups
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);

function handleFormProfileSubmit(inputs) {
    
    const nameInputValue = inputs.name;
    const jobInputValue = inputs.job;

    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    
}
//Обработчик «отправки» формы card
function handleFormCardSubmit(inputs) {// передаем фнкцию в класс
    const cardValue =  [{
       name: inputs.place, // данные из приватного метода класса getInputValues
       link: inputs.URL
    }]
    initRenderCard(cardValue);
}

initRenderCard(initialCards);


