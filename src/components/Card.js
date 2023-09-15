

export default class Card {
    constructor({name, link, _id}, templateSelector, handleImageClick, handleOpenPopupCardDelete, handleCardDel) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
        this._handleCardDel = handleCardDel;
        this._handleOpenPopupCardDelete =  handleOpenPopupCardDelete;
    }

    _getTemplate() { 
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector(".element")
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImg = this._element.querySelector(".element__img");
        this._btnCardDelete = this._element.querySelector(".element__button-delete");
        this._likesCounter = this._element.querySelector(".element__like-counter");
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._btnPopupImgOpen = this._element.querySelector(".element__link");
        this._cardTitle = this._element.querySelector(".element__title").textContent = this._name;
        this._btnCardLike = this._element.querySelector(".element__button-like");
        this._setEventListeners();
        return this._element;
    }



    removeCard() {
        this._element.remove();
        this._element = null;
    }


    _handleCardLike() {
        this._btnCardLike.classList.toggle("element__button-like_active");
    }

    _deleteCardButton() {
        this._handleCardDel(this);
    }

    _setEventListeners() {
        this._btnCardLike.addEventListener("click", () => {
            this._handleCardLike();
        });

        this._btnCardDelete.addEventListener("click", () => {
            this._deleteCardButton();
            this._handleOpenPopupCardDelete(this._id);
        });

        this._btnPopupImgOpen.addEventListener("click", () => {
           this._handleImageClick(this._link, this._name);
        })
    }
}


