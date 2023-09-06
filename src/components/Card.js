

export default class Card {
    constructor({name, link}, templateSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
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
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._btnPopupImgOpen = this._element.querySelector(".element__link");
        this._cardTitle = this._element.querySelector(".element__title").textContent = this._name;
        this._btnCardLike = this._element.querySelector(".element__button-like");
        this._setEventListeners();
        return this._element;
    }

    getCards(url) {
        return fetch(url, {
            headers: {
            authorization: '7185bb30-8f87-45c0-b11e-99f8eecf1653'
        }
     })
        .then(res => {
            if(res.ok) {
               return res.json()
            }
        })
    }

    _handleCardDelete() {
        this._element.remove();
        this._element = null;
    }

    _handleCardLike() {
        this._btnCardLike.classList.toggle("element__button-like_active");
    }

    _setEventListeners() {
        this._btnCardLike.addEventListener("click", () => {
            this._handleCardLike();
        });

        this._btnCardDelete.addEventListener("click", () => {
            this._handleCardDelete();
        });

        this._btnPopupImgOpen.addEventListener("click", () => {
           this._handleImageClick(this._link, this._name);
        })
    }
}