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
            })
        })
        .catch((err) => console.log(`ОШИБКА ${err}`));
    }

    
    setUserData(url, inputs) {
        return fetch(`${this._mainUrl}${url}`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${inputs.name}`,
                about: `${inputs.job}`,
            }),
        })
        .catch((err) => console.log(`ОШИБКА ${err}`));
    }
    
    setUserAvatar(url, inputAvatar) {
        return fetch(`${this._mainUrl}${url}`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: inputAvatar,
            }),
        })
        .catch((err) => console.log(`ОШИБКА ${err}`));
    }

    deleteResponse(id) {
       return fetch(`${this._mainUrl}cards/${id}`, {
            method: "DELETE", 
            headers: {
                authorization: this._authorization,
                "Content-Type": "application/json"
            },
        })
            .catch((err) => console.log(`ОШИБКА ${err}`));
        }

        deleteResponseLike(id) {
            return fetch(`${this._mainUrl}cards/${id}/likes`, {
                 method: "DELETE", 
                 headers: {
                     authorization: this._authorization,
                     "Content-Type": "application/json"
                 }
             })
                 .catch((err) => console.log(`ОШИБКА ${err}`));
             }

        addLikeToCard(id) {
            return fetch(`${this._mainUrl}cards/${id}/likes`, {
                    method: "PUT",
                    headers: {
                        authorization: this._authorization,
                        "Content-Type": "application/json",
                    }
                })
                .catch((err) => console.log(`ОШИБКА ${err}`))
            }
       
}
