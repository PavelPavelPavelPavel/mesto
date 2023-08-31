//массив с карточками
const initialCards = [
    {
        name: "После дождя",
        link: "https://avatars.dzeninfra.ru/get-zen_doc/51478/pub_5be9912c0a47b500aab03627_5be9919fc5937400aa07cfac/scale_1200",
    },
    {
        name: "Красный закат",
        link: "https://enotnavolge.ru/wp-content/uploads/5/b/0/5b020185b97ed0eef77da9b5ba38248a.jpeg",
    },
    {
        name: "Радуга",
        link: "https://i01.fotocdn.net/s130/eab97c65940b670a/public_pin_l/2933879329.jpg",
    },
    {
        name: "Березовая роща",
        link: "https://velikieludimira.ru/wp-content/uploads/berezovaja_rozha_1879.jpg",
    },
    {
        name: "Ай-Петри",
        link: "https://cont.ws/uploads/posts2/1214899.jpg",
    },
    {
        name: "Ночь на Днепре",
        link: "https://sun9-61.userapi.com/impg/5oKerSzTNWjrCratUt3oFcrs56WftP0bM3dfEA/uMxh0LZkdX4.jpg?size=1280x905&quality=96&sign=a7189184d3d401a31cfb786c48413687&type=album",
    },
];

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
const btnOpenProfile = document.querySelector(".profile__button");
const btnOpenCard = document.querySelector(".profile__add-button");
const formCard = document.querySelector(".popup__input-card");
const formProfile = document.querySelector(".popup__input-profile");
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_work");

export { initialCards, 
    validationConfig, 
    popupEditForm, 
    popupEditCards, 
    popupOpenImg, 
    btnOpenProfile, 
    btnOpenCard, 
    formCard, 
    formProfile,
    nameInput,
    jobInput };
