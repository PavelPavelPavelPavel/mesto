export default class Card {
  constructor(
    {
      data,
      handleImageClick,
      handleLikeAdd,
      handleLikeDel,
      handleOpenPopupCardDelete,
      handleCardDel,
    },
    templateSelector,
    myId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDel = handleLikeDel;
    this._handleCardDel = handleCardDel;
    this._handleOpenPopupCardDelete = handleOpenPopupCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(".element__img");
    this._btnCardDelete = this._element.querySelector(
      ".element__button-delete"
    );
    this._likesCounter = this._element.querySelector(".element__like-counter");
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._btnPopupImgOpen = this._element.querySelector(".element__link");
    this._cardTitle = this._element.querySelector(
      ".element__title"
    ).textContent = this._name;
    this._btnCardLike = this._element.querySelector(".element__button-like");
    this._updateLikesView();
    this._hideTheDeleteCardButton();
    this._setEventListeners();
    return this._element;
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  _updateLikesView() {
    this._likesCounter.textContent = this._likes.length || "";
    if (this._checkLike()) {
      this._btnCardLike.classList.add("element__button-like_active");
    } else {
      this._btnCardLike.classList.remove("element__button-like_active");
    }
  }

  _likeToggle() {
    if (!this._checkLike() && !this._checkButtonLikeState()) {
      this._handleLikeAdd(this._cardId);
    } else {
      this._handleLikeDel(this._cardId);
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _deleteCardButton() {
    this._handleCardDel(this);
  }

  _checkLike() {
    return this._likes.some((item) => {
      return item._id == this._myId;
    });
  }

  _checkButtonLikeState() {
    return this._btnCardLike.classList.contains("element__button-like_active");
  }

  _hideTheDeleteCardButton() {
    if (this._ownerId !== this._myId) {
      this._btnCardDelete.remove();
    }
  }

  _setEventListeners() {
    this._btnCardLike.addEventListener("click", () => {
      this._likeToggle();
    });

    this._btnCardDelete.addEventListener("click", () => {
      this._deleteCardButton();
      this._handleOpenPopupCardDelete(this._cardId);
    });

    this._btnPopupImgOpen.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }
}
