export default class Api {
  constructor(mainUrl) {
    this._authorization = "7185bb30-8f87-45c0-b11e-99f8eecf1653";
    this._mainUrl = mainUrl;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Что-то пошло не так...");
    });
  }

  getInfo() {
    return this._sendRequest(`${this._mainUrl}users/me`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  getInfoCards() {
    return this._sendRequest(`${this._mainUrl}cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  setNewCard(inputs) {
    return this._sendRequest(`${this._mainUrl}cards`, {
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

  setUserData(inputs) {
    return this._sendRequest(`${this._mainUrl}users/me`, {
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

  setUserAvatar(inputAvatar) {
    return this._sendRequest(`${this._mainUrl}users/me/avatar`, {
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
