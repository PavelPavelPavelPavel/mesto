import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popup, btn) {
    super(popup);
    this._btnSubmit = document.querySelector(btn);
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener("click", () => this.close());
  }

  open(id) {
    super.open();
    this.id = id;
  }

  toAcceptCallBack(id) {
    this._callBack = id;
  }

  close() {
    super.close();
    this._callBack(this.id);
  }
}
