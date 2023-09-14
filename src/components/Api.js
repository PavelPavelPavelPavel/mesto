export default class Api {
    constructor() {
        this._authorization = "7185bb30-8f87-45c0-b11e-99f8eecf1653";
        this._mainUrl = "https://mesto.nomoreparties.co/v1/cohort-75/";
    }

    
    getInfo(url) {
        return fetch(`${this._mainUrl}${url}`, {
            headers: {
                authorization: this._authorization,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } 
            })
            .catch((err) => console.log(`ОШИБКА ${err}`));
    }

    
    setNewCard(url, inputs) {
        return fetch(`${this._mainUrl}${url}`, {
            method: "POST",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                link: `${inputs.link}`,
                name: `${inputs.name}`,
            }),
        })
        .catch((err) => console.log(`ОШИБКА ${err}`));
    }

    
    setUserData(url, nameUser, workUser) {
        return fetch(`${this._mainUrl}${url}`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameUser,
                about: workUser,
            }),
        })
        .catch((err) => console.log(`ОШИБКА ${err}`));
    }

    deleteCard(id) {
       return fetch(`${this._mainUrl}cards/${id}`, {
            method: "DELETE", 
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                if(res.ok) {
                    return res.json()
                }
            })
            .catch((err) => console.log(`ОШИБКА ${err}`));
        }
       
}
