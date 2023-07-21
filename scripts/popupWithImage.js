import { Popup } from "./popup.js";

export  class PopupWithImage extends Popup {
    constructor(popupSelector, openingSelector, btns, link, name){
        super(popupSelector, openingSelector, btns);
        this._link = link;
        this._name = name; 
    }

    open(htmlLink, htmlName) {
        htmlLink.src = this._link;
        htmlName.textContent = this._name;
        htmlLink.alt = this._name;
        //console.log(htmlLink);
        //console.log(this._link);
        //console.log(htmlName);
        //console.log(this._name)
        super.open(); 
    }


}