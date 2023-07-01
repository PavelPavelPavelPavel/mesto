//импорт из файла данныхs
import { initialCards, validationConfig } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
// Находим форму в DOM
const popups = Array.from(document.querySelectorAll(".popup"));
const formElementProfile = document.querySelector(".popup__form_edit_profile");
const formElementCard = document.querySelector(".popup__form_edit_cards");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_job");
const placeInput = document.querySelector(".popup__value_field_place");
const urlInput = document.querySelector(".popup__value_field_url");
//формы
const formCard = document.getElementById("card");
const formProfile = document.getElementById("profile");
const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);
// Находим кнопку открытия popup и добавления карточки
const buttonOpenProfile = document.querySelector(".profile__button");
const buttonOpenCards = document.querySelector(".profile__add-button");
// Выбираем поля с именем и профессией
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__work");
//////////////////////////
const popupCaption = document.querySelector(".popup__caption");
const popupImgFullSize = document.querySelector(".popup__img");
//Находим popups
const popupEditForm = document.querySelector(".popup_edit_form");
const popupEditCards = document.querySelector(".popup_edit_cards");
const popupImg = document.querySelector(".popup_edit_img");
//Находим article в верстке для вставки template с карточками
const elements = document.querySelector(".elements");
//находим все кнопки в node и делаем массив
const buttonsClose = Array.from(document.querySelectorAll(".popup__button-close"));

//выбираем ближайшую кнопку
const closestBtn = (evt) => {
    const item = evt.target.closest(".popup");
    closePopup(item);
};
//закрываем popups без сохранения
const closePopupOnСross = (btns) => {
    btns.forEach((btn) => {
        btn.addEventListener("click", closestBtn);
    });
};
// функции открытия и закрытия popup
const initClosePopupByOverlayClick = () => {
    popups.forEach((popup) => {
        popup.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                closePopup(popup);
            }
        });
    });
};
//функция закрытия по нажатию на escape
function closePopupOnEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}
//закрытие popup
const closePopup = (value) => {
    value.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEscape);
};
//открытие popup
const openPopup = (value) => {
    value.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupOnEscape);
};
// функция открытия popup`s
function openPopupProfile() {
    openPopup(popupEditForm);
    profileValidity.enableValidation();
    profileValidity.clearingErrorInSpan();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profileValidity.enableSubmitButton();
}
function openPopupCard() {
    openPopup(popupEditCards);
    cardValidity.enableValidation();
    cardValidity.clearingErrorInSpan();
    cardValidity.formReset();
    cardValidity.disableSubmitButton();
}

function openPopupImg(name, url) {
    openPopup(popupImg);
    popupImgFullSize.src = url;
    popupCaption.textContent = name;
    popupImgFullSize.alt = name;
}

//открываем popup с карточками
buttonOpenCards.addEventListener("click", openPopupCard);
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
buttonOpenProfile.addEventListener("click", openPopupProfile);
// Обработчик «отправки» формы profile
function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;

    closePopup(popupEditForm);
}
//Обработчик «отправки» формы card
function handleFormCardSubmit(evt) {
    evt.preventDefault();

    const cardValue = {
        name: placeInput.value,
        link: urlInput.value,
        alt: placeInput.value,
    };
    //создаём карточку
    const card = new Card(cardValue, ".template-class", openPopupImg);
    elements.prepend(card.generateCard());
    closePopup(popupEditCards);
}

// Прикрепляем обработчик к форме:
formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formElementCard.addEventListener("submit", handleFormCardSubmit);
//рендерим карточки на страницу
const renderInitialCards = (cards) => {
    cards.forEach((item) => {
        const card = new Card(item, ".template-class", openPopupImg);
        elements.append(card.generateCard());
    });
};

closePopupOnСross(buttonsClose);
renderInitialCards(initialCards);
initClosePopupByOverlayClick();
