export default class UserInfo {
    constructor({ name, work }) {
        this._name = document.querySelector(name);
        this._work = document.querySelector(work);
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
