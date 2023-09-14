
const validationConfig = {
    form: ".popup__input-wrapper",
    inputSelector: ".popup__value",
    submitButtonSelector: ".popup__button",
    disabledButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__value_type_error",
    errorClass: "popup__error",
};

const popupEditForm = document.querySelector(".popup_edit_form");
const popupEditCards = document.querySelector(".popup_edit_cards");
const popupOpenImg = document.querySelector(".popup_edit_img");
const popupConfirmCardDelete = document.querySelector(".popup_edit_delete-card");
const btnOpenProfile = document.querySelector(".profile__button");
const btnOpenCard = document.querySelector(".profile__add-button");
const formCard = document.querySelector(".popup__input-card");
const formProfile = document.querySelector(".popup__input-profile");
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_work");
const userAvatar = document.querySelector(".profile__avatar-img");
const userName = document.querySelector(".profile__name");
const userWork = document.querySelector(".profile__work");

export { 
    validationConfig, 
    popupEditForm, 
    popupEditCards,
    popupOpenImg, 
    popupConfirmCardDelete,
    btnOpenProfile, 
    btnOpenCard, 
    formCard, 
    formProfile,
    nameInput,
    jobInput,
    userAvatar,
    userName,
    userWork
 };
