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
        fetch("https://mesto.nomoreparties.co/v1/cohort-75/users/me", {
            method: "PATCH",
            headers: {
                authorization: "7185bb30-8f87-45c0-b11e-99f8eecf1653",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameUser,
                about: workUser,
            }),
        });
        this._name.textContent = nameUser;
        this._work.textContent = workUser;
    }

    getUserData() {
        return fetch("https://nomoreparties.co/v1/cohort-75/users/me", {
            headers: {
                authorization: "7185bb30-8f87-45c0-b11e-99f8eecf1653",
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        });
    }
}
