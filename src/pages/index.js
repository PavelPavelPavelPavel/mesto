import "./index.css";
import { validationConfig, popupEditForm, popupEditCards, popupOpenImg, popupConfirmCardDelete, popupEditAvatar, btnOpenProfile, btnOpenCard, btnOpenAvatar, formCard, formProfile, formAvatar, nameInput, jobInput, userAvatar, userName, userWork } from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";

const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);
const avatarValidity = new FormValidator(validationConfig, formAvatar);
const cardForm = new PopupWithForm(popupEditCards, formCard, ".popup__value", handleFormCardSubmit);
const profileForm = new PopupWithForm(popupEditForm, formProfile, ".popup__value", handleFormProfileSubmit);
const avatarForm = new PopupWithForm(popupEditAvatar, formAvatar, ".popup__value", handleFormAvatarSubmit);
const imgPopup = new PopupWithImage(popupOpenImg);
const deleteCardConfirmPopup = new PopupWithConfirm(popupConfirmCardDelete, ".popup__button-confirm");

const userInfo = new UserInfo(userName, userWork, userAvatar);

const api = new Api();

const cardSection = new Section({
    renderer: (items) => {
        const newCard = createCard(items);
        cardSection.addItems(newCard);
    }
},".elements");

function createCard(arr) { 
   const card = new Card(arr, ".template", openPopupImg, openPopupConfirmDelete, () => {
    deleteCardConfirmPopup.toAcceptCallBack(id => {
    api.deleteCard(id)
    .then(() => {
        card.removeCard();
    })
    .catch(err => console.log(err))
  })
});
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

function openPopupConfirmDelete(id) {
    deleteCardConfirmPopup.open(id);
}

function openPopupCard() {
    cardForm.open();
    cardValidity.hideErrors();
    cardValidity.disableSubmitButton();
}

function openPopupImg(link, name) {
    imgPopup.open(link, name);
}

function openPopupAvatar() {
    avatarForm.open();
    avatarValidity.hideErrors();
    avatarValidity.disableSubmitButton();
}

function handleFormAvatarSubmit(input) {
    api.setUserAvatar('users/me/avatar', input.link);
    userAvatar.src = input.link;
    avatarForm.close();
}

function handleFormProfileSubmit(inputs) {
    userInfo.setUserInfo(inputs.name, inputs.job);
    api.setUserData('users/me', inputs.name, inputs.job)
    profileForm.close();
}


function handleFormCardSubmit(inputs) {
    api.setNewCard('cards', inputs);
    const newCard = createCard(inputs);
    cardSection.addItem(newCard);
    cardForm.close();
}


api.getInfo('users/me') 
  .then((res) => {
        userName.textContent = res.name;
        userWork.textContent = res.about;
        userAvatar.src = res.avatar;
  })
  
api.getInfo('cards')
  .then((data) => {
      //console.log(data[0])
      //console.log(data[0].owner._id)
      //console.log(data)
      cardSection.renderItems(data)
  })

profileForm.setEventListeners();
cardForm.setEventListeners();
imgPopup.setEventListeners();
avatarForm.setEventListeners();
deleteCardConfirmPopup.setEventListeners();
cardValidity.enableValidation();
profileValidity.enableValidation();
avatarValidity.enableValidation();
btnOpenCard.addEventListener("click", openPopupCard);
btnOpenProfile.addEventListener("click", openPopupProfile);
btnOpenAvatar.addEventListener("click", openPopupAvatar);





