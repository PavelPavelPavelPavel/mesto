import "./index.css";
import { initialCards, validationConfig, popupEditForm, popupEditCards, popupOpenImg, btnOpenProfile, btnOpenCard, formCard, formProfile, nameInput, jobInput } from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);

const cardForm = new PopupWithForm(popupEditCards, "popup_opened", formCard, ".popup__value", handleFormCardSubmit);
const profileForm = new PopupWithForm(popupEditForm, "popup_opened", formProfile, ".popup__value", handleFormProfileSubmit);

const userInfo = new UserInfo(".profile__name", ".profile__work");

const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened");

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (cardItem) => {
            const newCards = createCard(cardItem);
            cardSection.addItem(newCards);
        },
    },
    ".elements"
);

function createCard(arr) {
    const card = new Card(arr, ".template", openPopupImg);
    const cardElement = card.generateCard();
    return cardElement;
}

function setProfileFormCurrentValues() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.work;
}

function openPopupProfile() {
    setProfileFormCurrentValues();
    profileForm.open();
    profileValidity.hideErrors();
    profileValidity.enableSubmitButton();
}

function openPopupCard() {
    cardForm.open();
    cardValidity.hideErrors();
    cardValidity.disableSubmitButton();
}

function openPopupImg(link, name) {
    imgPopup.open(link, name);
}

function handleFormProfileSubmit(inputs) {
    userInfo.setUserInfo(inputs.name, inputs.job);
    profileForm.close();
}

function handleFormCardSubmit(inputs) {
    const newCard = createCard(inputs);
    cardSection.addItem(newCard);
    cardForm.close();
}

cardSection.renderItems();

profileForm.setEventListeners();
cardForm.setEventListeners();
imgPopup.setEventListeners();
cardValidity.enableValidation();
profileValidity.enableValidation();
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);
