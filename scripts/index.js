import { initialCards, validationConfig } from "./data.js";
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { Section } from "./section.js";
import { Popup } from "./popup.js";
import { PopupWithImage } from "./popupWithImage.js";

// Находим форму в DOM
const formElementProfile = document.querySelector(".popup__form_edit_profile");
const formElementCard = document.querySelector(".popup__form_edit_cards");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_job");
const placeInput = document.querySelector(".popup__value_field_place");
const urlInput = document.querySelector(".popup__value_field_url");
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
// Выбираем поля с именем и профессией
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__work");
//формы
const formCard = document.getElementById("card");
const formProfile = document.getElementById("profile");
const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);
class Popups extends Popup {
    constructor(popupSelector) {
        super(popupSelector, "popup_opened", buttonsClose)
    }
};
const cardPopup = new Popups(popupEditCards);
const profilePopup = new Popups(popupEditForm);




function initRenderCard (data, containerSelector = '.elements') {
    const defaultCard = new Section({
        items: data, 
        renderer: (item) => {
          const card =  new Card(item, '.template', openPopupImg);
          const cardElement = card.generateCard();
          defaultCard.addItem(cardElement);
        }}, containerSelector);
        defaultCard.renderItems();
    }
// функция открытия popup`s
function openPopupProfile() {
    profilePopup.open();
    profilePopup.setEventListeners();
    profileValidity.enableValidation();
    profileValidity.clearingErrorInSpan();
    profileValidity.enableSubmitButton();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopupCard() {
    cardPopup.open();
    cardPopup.setEventListeners();
    cardValidity.enableValidation();
    cardValidity.clearingErrorInSpan();
    cardValidity.resetForm();
    cardValidity.disableSubmitButton();
}


function openPopupImg(link, name) {
    const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened", buttonsClose, link, name);
    imgPopup.open(popupImgFullSize, popupCaption);
    imgPopup.setEventListeners();
}

//открываем popups
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);
// Обработчик «отправки» формы profile
function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    profilePopup.close();
}
//Обработчик «отправки» формы card
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const cardValue = [{
        name: placeInput.value,
        link: urlInput.value,
    }];
    initRenderCard(cardValue);
    cardPopup.close();
}
// Прикрепляем обработчик к форме:
formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formElementCard.addEventListener("submit", handleFormCardSubmit);
initRenderCard(initialCards);

