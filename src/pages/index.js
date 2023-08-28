import './index.css';
import { initialCards, validationConfig } from "../utils/data.js";
import  FormValidator  from "../components/formValidator.js";
import  Card  from "../components/card.js";
import  Section  from "../components/section.js";
import  PopupWithImage  from "../components/popupWithImage.js";
import  PopupWithForm  from "../components/popupWithForm.js";
import  UserInfo  from "../components/userInfo.js";

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
const cardForm = new PopupWithForm(popupEditCards, "popup_opened", buttonsClose, formCard, ".popup__value", handleFormCardSubmit);
const profileForm = new PopupWithForm(popupEditForm, "popup_opened", buttonsClose, formProfile, ".popup__value", handleFormProfileSubmit);
const userInfo = new UserInfo({
    name: '.profile__name', 
    work: '.profile__work'
});
//принимает массив с карточками - data
function initRenderCard(data, containerSelector = ".elements") {
    const defaultCard = new Section({
            items: data, //массив с карточками
            renderer: (item) => {
                // функция  создания карточки
                const card = new Card(item, ".template", openPopupImg);
                const cardElement = card.generateCard();
                defaultCard.addItem(cardElement);
            },
        },
        containerSelector
    );
    defaultCard.renderItems(); //??
};

function addValueToForm () {
const nameInput = document.querySelector(".popup__value_field_name"); //данные поля формы
const jobInput = document.querySelector(".popup__value_field_job");
const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.work;
};

// функция открытия popup`s
function openPopupProfile() {
    addValueToForm();
    profileForm.open();
    profileForm.setEventListeners();

    profileValidity.enableValidation();
    profileValidity.clearingErrorInSpan();
    profileValidity.enableSubmitButton();
};

function openPopupCard() {
    cardForm.open();
    cardForm.setEventListeners();

    cardValidity.enableValidation();
    cardValidity.clearingErrorInSpan();
    cardValidity.disableSubmitButton();
};

function openPopupImg(link, name) {
    const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened", buttonsClose, formImage, link, name);
    imgPopup.open(popupImgFullSize, popupCaption);
    imgPopup.setEventListeners();
};

//открываем popups
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);

function handleFormProfileSubmit(inputs) {
    userInfo.setUserInfo(inputs.name, inputs.job)
};
//Обработчик «отправки» формы card
function handleFormCardSubmit(inputs) {
    const cardValue = [
        {
            name: inputs.place,
            link: inputs.URL,
        },
    ];
    initRenderCard(cardValue);
}

initRenderCard(initialCards);
