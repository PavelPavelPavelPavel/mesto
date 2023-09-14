export default class UserInfo {
    constructor(nameElement, workElement) {
        this._name = nameElement;
        this._work = workElement;
    }

    getUserInfo() {
        this._item = {
            name: this._name.textContent,
            work: this._work.textContent,
        };
        return this._item;
    }

    setUserInfo(nameUser, workUser) {
        this._name.textContent = nameUser;
        this._work.textContent = workUser;
    }
        
}
