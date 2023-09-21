export default class Api {
  constructor() {
    this._authorization = "7185bb30-8f87-45c0-b11e-99f8eecf1653";
    this._mainUrl = "https://mesto.nomoreparties.co/v1/cohort-75/";
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Что-то пошло не так...");
      })
      .catch((error) => {
        console.log(`Alarm! ${error}`);
      });
  }

  getInfo(url) {
    return this._sendRequest(`${this._mainUrl}${url}`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  setNewCard(url, inputs) {
    return this._sendRequest(`${this._mainUrl}${url}`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: `${inputs.link}`,
        name: `${inputs.name}`,
      }),
    });
  }

  setUserData(url, inputs) {
    return this._sendRequest(`${this._mainUrl}${url}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${inputs.name}`,
        about: `${inputs.job}`,
      }),
    });
  }

  setUserAvatar(url, inputAvatar) {
    return this._sendRequest(`${this._mainUrl}${url}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: inputAvatar,
      }),
    });
  }

  deleteResponse(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }

  deleteResponseLike(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }

  addLikeToCard(id) {
    return this._sendRequest(`${this._mainUrl}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    });
  }
}
