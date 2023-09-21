import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popup, btn) {
        super(popup);
        this._btnSubmit = document.querySelector(btn);

    }

    setEventListeners() {
        super.setEventListeners();
        this._btnSubmit.addEventListener("click", () => this._toAccept());
    }

    open(id) {
        super.open();
        this.id = id;// получаем id карты из Card
    }

    toAcceptCallBack(id) {//передаем в момент создания карты метод класса и выполняем нужные действия с картой
        this._callBack = id;
    }


    _toAccept() {//навешиваем на кнопку подтвержления
        this._popup.classList.remove(this._openingSelector);
        this._callBack(this.id);//вызываем функцию которая отвечает за действия кнопки(с данными получеными из метода open)
 }
}