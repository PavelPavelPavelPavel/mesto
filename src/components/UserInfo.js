export default class UserInfo {
    constructor(nameSelector, workSelector) {
        this._name = document.querySelector(nameSelector);
        this._work = document.querySelector(workSelector);
    }

    getUserInfo() {
        this._item = {
            name: this._name.textContent,
            work: this._work.textContent,
        };
        return this._item;
    }

    setUserInfo(name, work) {
        this._name.textContent = name;
        this._work.textContent = work;
    }
}
