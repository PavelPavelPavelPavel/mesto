

export default class Card {
    constructor({data, handleImageClick, handleOpenPopupCardDelete, handleCardDel}, templateSelector, myId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = data.owner._id;
    this._myId = myId;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDel = handleCardDel;
    this._handleOpenPopupCardDelete =  handleOpenPopupCardDelete;
    //this._addLike = addLike;
    //this._addLikeButton = this._addLikeButton.bind(this);
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

    _deleteCardButton() {
        this._handleCardDel(this);
    } 


    hideTheDeleteCardButton() {
        if(this._userId !== this._myId) {
            this._btnCardDelete.remove();
        }
   }
    _addLikeButton() {
        this._addLike(this._id, this._btnCardLike);
    }


    _setEventListeners() {
        this._btnCardLike.addEventListener("click", () => {
            //console.log(this._userId);
            //console.log(this._myId);
            //this._addLikeButton()
        });

        //if(this._btnCardDelete) {
        this._btnCardDelete.addEventListener("click", () => {
            this._deleteCardButton();
            this._handleOpenPopupCardDelete(this._id);
        })//}// else { 
      //}

        this._btnPopupImgOpen.addEventListener("click", () => {
           this._handleImageClick(this._link, this._name);
        })
    }
}


