import "./index.css";
import { initialCards, validationConfig, popupEditForm, popupEditCards, popupOpenImg, btnOpenProfile, btnOpenCard, formCard, formProfile, nameInput, jobInput, userAvatar, userName, userWork } from "../utils/data.js";
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

const userInfo = new UserInfo(userName, userWork, userAvatar);

const imgPopup = new PopupWithImage(popupOpenImg, "popup_opened");

const cardSection = new Section({
    renderer: (items) => {
        const newCard = createCard(items);
        cardSection.addItem(newCard);
    }
},".elements");


function createCard(arr) { // функция создания новой карточки
   const card = new Card(arr, ".template", openPopupImg);
   const cardElement = card.generateCard();
   //card.getCards('https://nomoreparties.co/v1/cohort-75/cards')
   //.then((cards) => {
       //console.log(cards)
   //});
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
    setNewCard('https://mesto.nomoreparties.co/v1/cohort-75/cards', inputs);
    const newCard = createCard(inputs);
    cardSection.addItem(newCard);
    cardForm.close();
}


//cardSection.renderItems();
userInfo.getUserData()
  .then((result) => {
        userName.textContent = result.name;
        userWork.textContent = result.about;
        userAvatar.src = result.avatar;
  })
  .catch((err) => console.log(`ОШИБКА ${err}`));

function test() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards', {
    headers: {
    authorization: '7185bb30-8f87-45c0-b11e-99f8eecf1653'
}
})
.then(res => {
    if(res.ok) {
       return res.json()
    }
})
.then((data) => {
    cardSection.renderItems(data)
})
}

function setNewCard(url, inputs) {
    fetch(url, {
    method: 'POST',
    headers: {
    authorization: '7185bb30-8f87-45c0-b11e-99f8eecf1653',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    link: `${inputs.link}`,
    name: `${inputs.name}`
  })
}); 
}

test();
profileForm.setEventListeners();
cardForm.setEventListeners();
imgPopup.setEventListeners();
cardValidity.enableValidation();
profileValidity.enableValidation();
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);







