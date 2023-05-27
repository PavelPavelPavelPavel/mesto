//импорт из файла данных
import { initialCards } from "./data.js";
// Находим форму в DOM
const formElementProfile = document.querySelector(".popup__form_edit_profile");
const formElementCard = document.querySelector(".popup__form_edit_cards");
//находим все что относится к popupImg
const popupImg = document.querySelector(".popup_edit_img");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__value_field_name");
const jobInput = document.querySelector(".popup__value_field_job");
const placeInput = document.querySelector(".popup__value_field_place");
const urlInput = document.querySelector(".popup__value_field_url");
//находим поля для реального размера карточки и подписи
const popupCaption = document.querySelector(".popup__caption");
const popupImgFullSize = document.querySelector(".popup__img");
//
const templateCards = document.querySelector("#template").content;

// Находим кнопку открытия popup и добавления карточки
const buttonOpenProfile = document.querySelector(".profile__button");
const buttonOpenCards = document.querySelector(".profile__add-button");
//создаем функцию для кнопки удаления и лайка
const deleteCardButton = (evt) => {
    const item = evt.target.closest(".element");
    item.remove();
};
const likeCardButton = (evt) => {
    const item = evt.target.closest(".element__button-like");
    item.classList.toggle("element__button-like_active");
};
// Выбираем поля с именем и профессией
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__work");
//Находим popups
const popup = document.querySelector(".popup");
const popupEditForm = document.querySelector(".popup_edit_form");
const popupEditCards = document.querySelector(".popup_edit_cards");
//Находим article в верстке для вставки template с карточками
const elements = document.querySelector(".elements");

// Находим кнопку закрытия popup
const buttonPopupClose = document.querySelectorAll(".popup__button-close");
//создаем массив из NodeList
const buttonClose = Array.from(buttonPopupClose);
// функция присвоения класса  popup
const popupClose = (value) => value.classList.remove("popup_opened");
const popupOpen = (value) => value.classList.add("popup_opened");
// функция открытия popup`s
function openPopupProfile() {
    popupOpen(popupEditForm);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
function openPopupCard() {
    popupOpen(popupEditCards);
    placeInput.value = "";
    urlInput.value = "";
}
//функцтя открытия фото реального размера
function openPopupImg(link, text) {
    popupOpen(popupImg);
    popupImgFullSize.src = link;
    popupCaption.textContent = text;
    popupImgFullSize.alt = text;
}
//открываем popup с карточками
buttonOpenCards.addEventListener("click", openPopupCard);
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
buttonOpenProfile.addEventListener("click", openPopupProfile);
//закрываем popups без сохранения
for (let i = 0; i < buttonClose.length; i++) {
    buttonClose[i].addEventListener("click", function () {
        if (buttonClose[i] === buttonClose[0]) {
            popupClose(popupEditForm);
        } else if (buttonClose[i] === buttonClose[1]) {
            popupClose(popupEditCards);
        } else {
            popupClose(popupImg);
        }
    });
}
// Обработчик «отправки» формы profile
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    //закрытие popup
    popupClose(popupEditForm);
    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
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

    popupClose(popupEditCards);
    //создаём карточку
    elements.prepend(createCard(cardValue));
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
const renderCard = (item) => {
    item.forEach((item) => {
        elements.append(createCard(item));
    });
};

renderCard(initialCards);
