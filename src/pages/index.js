import "./index.css";
import {
  validationConfig,
  btnOpenProfile,
  btnOpenCard,
  btnOpenAvatar,
  formCard,
  formProfile,
  formAvatar,
  nameInput,
  jobInput,
  userAvatar,
  userName,
  userWork,
} from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";

let myId;
const cardValidity = new FormValidator(validationConfig, formCard);
const profileValidity = new FormValidator(validationConfig, formProfile);
const avatarValidity = new FormValidator(validationConfig, formAvatar);
const cardForm = new PopupWithForm(
  ".popup_edit_cards",
  formCard,
  ".popup__value",
  handleFormCardSubmit
);
const profileForm = new PopupWithForm(
  ".popup_edit_form",
  formProfile,
  ".popup__value",
  handleFormProfileSubmit
);
const avatarForm = new PopupWithForm(
  ".popup_edit_avatar",
  formAvatar,
  ".popup__value",
  handleFormAvatarSubmit
);
const imgPopup = new PopupWithImage(".popup_edit_img");
const deleteCardConfirmPopup = new PopupWithConfirm(
  ".popup_edit_delete-card",
  ".popup__button-confirm"
);
const userInfo = new UserInfo(userName, userWork, userAvatar);
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-75/");
const cardSection = new Section(
  {
    renderer: (items) => {
      const newCard = createCard(items);
      cardSection.addItems(newCard);
    },
  },
  ".elements"
);

Promise.all([api.getInfo(), api.getInfoCards()])
  .then(([res, data]) => {
    myId = res._id;
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatarFromServer(res.avatar);
    cardSection.renderItems(data);
  })
  .catch((err) => console.log(err));

function createCard(arr) {
  const card = new Card(
    {
      data: arr,
      handleImageClick: (link, name) => {
        openPopupImg(link, name);
      },
      handleLikeAdd: (id) => {
        api
          .addLikeToCard(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((error) => {
            console.log(`Alarm! ${error}`);
          });
      },
      handleLikeDel: (id) => {
        api
          .deleteResponseLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((error) => {
            console.log(`Alarm! ${error}`);
          });
      },
      handleOpenPopupCardDelete: (id) => {
        openPopupConfirmDelete(id);
        deleteCardConfirmPopup.toAcceptCallBack((id) => {
          api
            .deleteResponse(id)
            .then(() => {
              handleFormCardDel(() => {
                card.removeCard();
              });
            })
            .catch((error) => {
              console.log(`Alarm! ${error}`);
            });
        });
      },
    },
    ".template",
    myId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function openPopupProfile() {
  userInfo.setCurrentValuesToForm(nameInput, jobInput);
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
  api
    .setUserAvatar(input.link)
    .then((res) => {
      userInfo.setUserAvatar(res);
      avatarForm.close();
    })
    .catch((error) => {
      console.log(`Alarm! ${error}`);
    })
    .finally(() => {
      avatarForm.resetBtnSubmit("Сохранить");
    });
}

function handleFormCardDel(cardRemove) {
  cardRemove();
  deleteCardConfirmPopup.close();
}

function handleFormProfileSubmit(inputs) {
  api
    .setUserData(inputs)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileForm.close();
    })
    .catch((error) => {
      console.log(`Alarm! ${error}`);
    })
    .finally(() => {
      profileForm.resetBtnSubmit("Сохранить");
    });
}

function handleFormCardSubmit(inputs) {
  api
    .setNewCard(inputs)
    .then((data) => {
      const newCard = createCard(data);
      cardSection.addItem(newCard);
      cardForm.close();
    })
    .catch((error) => {
      console.log(`Alarm! ${error}`);
    })
    .finally(() => {
      cardForm.resetBtnSubmit("Сохранить");
    });
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
