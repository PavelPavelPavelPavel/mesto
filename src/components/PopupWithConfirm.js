import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popup, btn) {
    super(popup);
    this._btnSubmit = document.querySelector(btn);
  }

  open(id) {
    super.open();
    this.id = id;
  }

  toAcceptCallBack(id) {
    this._callBack = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener("click", () => {
      this._callBack(this.id);
    });
  }
}
