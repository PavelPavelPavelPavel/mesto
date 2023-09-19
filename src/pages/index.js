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

let myId;
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


Promise.all([api.getInfo('users/me'), api.getInfo('cards')])
  .then(([res, data]) => {
     myId = res._id;
     userInfo.setUserInfo(res.name, res.about);
     userInfo.setUserAvatarFromServer(res.avatar);
     cardSection.renderItems(data);
     //console.log(data)
  })
  .catch(error => console.log(error));



function createCard(arr) {   
const card = new Card({
    data: arr,
    handleImageClick: (link, name) => {
        openPopupImg(link, name);
    },
    handleLikeAdd: (id, like) => {
      api.addLikeToCard(id, like)
      .then(res => {
        if(res.ok) {
            card.likeAdd()
        }
      })
    },
    handleOpenPopupCardDelete: (id) => {
        openPopupConfirmDelete(id);
    },
    handleLikeDel: (id, like) => {
        api.deleteResponseLike(id, like)
        .then(res => {
            if(res.ok) {
                card.likeDel()
            }
          })
    },
    handleCardDel: () => {
        deleteCardConfirmPopup.toAcceptCallBack(id => {
        api.deleteResponse(id)
        .then((res) => {
            if(res.ok) {
                card.removeCard();
            }
        })
  })
    },
}, ".template", myId);
   const cardElement = card.generateCard();
   card.addUserLikesToInitialCards();
   card.hideTheDeleteCardButton();
   return cardElement;
   
}




//function getLike(id, btn) {
    //api.addLikeToCard(`cards/${id}/likes`)
    //.then(() => {
       // btn.classList.add("element__button-like_active");
    //})
//}


function openPopupProfile() {
    userInfo.setCurrentValuesToForm(nameInput, jobInput)
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
    userInfo.setUserAvatar(input);
    avatarForm.close();
}

function handleFormProfileSubmit(inputs) { 
    api.setUserData('users/me', inputs)
    .then(res => {
        if(res.ok) {
           return userInfo.setUserInfo(inputs.name, inputs.job);
        }
    })
    profileForm.close();
}


function handleFormCardSubmit(inputs) {
        api.setNewCard('cards', inputs)
        .then((res) => {
            if(res.ok) {
                //console.log(res)
               res.json();
            }
        });
    const newCard = createCard(inputs);
    cardSection.addItem(newCard);
    cardForm.close();
}

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







