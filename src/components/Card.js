export default class Card {

    constructor({ data, handleImageClick, handleLikeAdd, handleLikeDel, handleOpenPopupCardDelete, handleCardDel }, templateSelector, myId) {
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
        this._count = this._likes.length;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImg = this._element.querySelector(".element__img");
        this._btnCardDelete = this._element.querySelector(".element__button-delete");
        this._likesCounter = this._element.querySelector(".element__like-counter");
        this._likesCounter.textContent = this._count;
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
        if (this._ownerId !== this._myId) {
            this._btnCardDelete.remove();
        }
    }

    _checkLike() {
        this._myLike = this._likes.some((item) => {
            return item._id == this._myId;
        });
        return this._myLike;
    }

    _checkButtonLikState() {
        console.log(this._btnCardLike.classList.contains("element__button-like_active"));
    }

    likeDel() {
             this._btnCardLike.classList.remove("element__button-like_active");
             this._likesCounter.textContent =  this._count -= 1;
             console.log(`Del ${this._count}`)
             //console.log(this._checkLike())
    }


    likeAdd() {
             console.log(`Add ${this._count}`)
             this._btnCardLike.classList.add("element__button-like_active");
             this._likesCounter.textContent = this._count += 1;
             console.log(`Add ${this._count}`)
             //console.log(this._checkLike())
    }



    _likeToggle() {
        if (!this._checkLike()) {
            this._handleLikeAdd(this._cardId, this._ownerId);
        } else {
            this._handleLikeDel(this._cardId, this._ownerId);  
        }
    }

    addUserLikesToInitialCards() {
        if (this._checkLike()) {
            this._btnCardLike.classList.add("element__button-like_active");
        }
    }

    _setEventListeners() {
        this._btnCardLike.addEventListener("click", () => {
            this._likeToggle()
            // this._count += 1;
            // this._likesCounter.textContent = this._count;
            // console.log(this._count);
        });

        this._btnCardDelete.addEventListener("click", () => {
            this._deleteCardButton();
            this._handleOpenPopupCardDelete(this._cardId);
        });

        this._btnPopupImgOpen.addEventListener("click", () => {
            this._handleImageClick(this._link, this._name);
        });
    }

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
    this._likesCounter.textContent = this._likes.length;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._btnPopupImgOpen = this._element.querySelector(".element__link");
    this._cardTitle = this._element.querySelector(
      ".element__title"
    ).textContent = this._name;
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

  _checkLike() {
    return this._likes.some((item) => {
      return item._id == this._myId;
    });
  }

  _checkButtonLikeState() {
    return this._btnCardLike.classList.contains("element__button-like_active");
  }

  hideTheDeleteCardButton() {
    if (this._ownerId !== this._myId) {
      this._btnCardDelete.remove();
    }
  }

  addUserLikesToInitialCards() {
    if (this._checkLike()) {
      this._btnCardLike.classList.add("element__button-like_active");
    }
    this._zeroLike();
  }

  _likeToggle() {
    if (!this._checkLike() && !this._checkButtonLikeState()) {
      this._handleLikeAdd(this._cardId);
    } else {
      this._handleLikeDel(this._cardId);
    }
  }

  likeAdd(res) {
    this._btnCardLike.classList.add("element__button-like_active");
    this._likesCounter.textContent = res.likes.length;
  }

  likeDel(res) {
    this._btnCardLike.classList.remove("element__button-like_active");
    this._likesCounter.textContent = res.likes.length;
    this._zeroLike();
  }

  _zeroLike() {
    if (this._likesCounter.textContent === "0") {
      this._likesCounter.textContent = "";
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
