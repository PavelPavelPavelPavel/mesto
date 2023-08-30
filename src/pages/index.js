import "./index.css";
import { initialCards, validationConfig, popupEditForm, popupEditCards, popupOpenImg, btnOpenProfile, btnOpenCard, formCard, formProfile } from "../utils/data.js";
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

const userInfo = new UserInfo({
    name: ".profile__name",
    work: ".profile__work",
});

const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened");
imgPopup.setEventListeners();

const defaultCard = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, ".template", openPopupImg);
            const cardElement = card.generateCard();
            defaultCard.addItem(cardElement);
        },
    },
    ".elements"
);

function addValueToForm() {
    const nameInput = document.querySelector(".popup__value_field_name");
    const jobInput = document.querySelector(".popup__value_field_work");
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.work;
}

function openPopupProfile() {
    addValueToForm();
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
    const cardValue = [
        {
            name: inputs.place,
            link: inputs.URL,
        },
    ];
    cardValue.forEach((item) => {
        const card = new Card(item, ".template", openPopupImg);
        const cardElement = card.generateCard();
        return defaultCard.addItem(cardElement);
    });
    cardForm.close();
}

defaultCard.renderItems();

profileForm.setEventListeners();
cardForm.setEventListeners();
cardValidity.enableValidation();
profileValidity.enableValidation();
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);
