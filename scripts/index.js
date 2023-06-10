//импорт из файла данныхs
import { initialCards, validationConfig } from "./data.js";
import { enableValidation, addClassButton, removeClassButton } from "./validate.js";

// Находим форму в DOM
const popups = Array.from(document.querySelectorAll(".popup"));
const formElementProfile = document.querySelector(".popup__form_edit_profile");
const formElementCard = document.querySelector(".popup__form_edit_cards");
//находим все что относится к popupImg
const popupImg = document.querySelector(".popup_edit_img");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_job");
const placeInput = document.querySelector(".popup__value_field_place");
const urlInput = document.querySelector(".popup__value_field_url");
const inputs = Array.from(document.querySelectorAll(validationConfig.inputSelector));
//находим поле с ошибкой
const formsErrorSpan = Array.from(document.querySelectorAll(".popup__error"));
//находим поля для реального размера карточки и подписи
const popupCaption = document.querySelector(".popup__caption");
const popupImgFullSize = document.querySelector(".popup__img");
//находим template
const templateCards = document.querySelector("#template").content;
// Находим кнопку открытия popup и добавления карточки
const buttonOpenProfile = document.querySelector(".profile__button");
const buttonOpenCards = document.querySelector(".profile__add-button");
// Выбираем поля с именем и профессией
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__work");
//Находим popups
const popupEditForm = document.querySelector(".popup_edit_form");
const popupEditCards = document.querySelector(".popup_edit_cards");
//Находим article в верстке для вставки template с карточками
const elements = document.querySelector(".elements");
//находим все кнопки в node и делаем массив
const buttonsClose = Array.from(document.querySelectorAll(".popup__button-close"));
//кнопка удаоения карточки
const deleteCardButton = (evt) => {
    const item = evt.target.closest(".element");
    item.remove();
};
//кнопка лайка карточки
const likeCardButton = (evt) => {
    const item = evt.target.closest(".element__button-like");
    item.classList.toggle("element__button-like_active");
};
//функция закрытия по нажатию на escape
function closePopupOnEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}
//выбираем ближайшую кнопку
const closestBtn = (evt) => {
    const item = evt.target.closest(".popup");
    closePopup(item);
}
//закрываем popups без сохранения
const closePopupOnСross = (btns) => {
    btns.forEach(btn => {
     btn.addEventListener('click', closestBtn)
    })
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
//очистка спана при закрытии popup
const clearingErrorInSpan = (spanElement, inputElement) => {
    spanElement.forEach((span) => {
        span.textContent = "";
    });
    inputElement.forEach((input) => {
        input.classList.remove(validationConfig.inputErrorClass);
    });
};
//скрываем кнопку popup__card при повторном открытии
const disabledButtonPopupCard = () => {
    const submitButton = document.querySelector(".popup__button-card");
    addClassButton(submitButton, validationConfig);
};
//показываем кнопку popup__profile при повторном открытии
const ebableButtonPopupProfile = () => {  
    const submitButton = document.querySelector(".popup__button-profile");
    removeClassButton(submitButton, validationConfig);
};
// функция открытия popup`s
function openPopupProfile() {
    openPopup(popupEditForm);
    clearingErrorInSpan(formsErrorSpan, inputs);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    ebableButtonPopupProfile();

}
function openPopupCard() {
    openPopup(popupEditCards);
    clearingErrorInSpan(formsErrorSpan, inputs);
    document.getElementById('card').reset();
    disabledButtonPopupCard();
}
//функцтя открытия фото реального размера
function openPopupImg(link, text) {
    openPopup(popupImg);
    popupImgFullSize.src = link;
    popupCaption.textContent = text;
    popupImgFullSize.alt = text;
}
//открываем popup с карточками
buttonOpenCards.addEventListener("click", openPopupCard);
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
buttonOpenProfile.addEventListener("click", openPopupProfile);
// Обработчик «отправки» формы profile
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    //закрытие popup
    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    closePopup(popupEditForm);
}
//Обработчик «отправки» формы card
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    //объект со значениями полей для новой карточки
    const cardValue = {
        name: placeInput.value,
        link: urlInput.value,
        alt: placeInput.value,
    };
    //создаём карточку
    elements.prepend(createCard(cardValue));
    closePopup(popupEditCards);
}

//получаем карточку с содержимым
const createCard = (card) => {
    const cardElement = templateCards.querySelector(".element").cloneNode(true);
    const cardImg = cardElement.querySelector(".element__img");
    //вешаем слушатель на кнопку удаления
    cardElement.querySelector(".element__button-delete").addEventListener("click", deleteCardButton);
    cardImg.src = card.link;
    cardImg.alt = card.name;
    cardElement.querySelector(".element__link").addEventListener("click", () => openPopupImg(card.link, card.name));
    cardElement.querySelector(".element__wrapper");
    cardElement.querySelector(".element__title").textContent = card.name;
    //вешаем слушатель на кнопку лайка
    cardElement.querySelector(".element__button-like").addEventListener("click", likeCardButton);
    return cardElement;
};
// Прикрепляем обработчик к форме:
formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formElementCard.addEventListener("submit", handleFormCardSubmit);
//рендерим карточки на страницу
const renderInitialCards = (card) => {
    card.forEach((card) => {
        elements.append(createCard(card));
    });
};

closePopupOnСross(buttonsClose);
renderInitialCards(initialCards);
initClosePopupByOverlayClick();
enableValidation(validationConfig);
