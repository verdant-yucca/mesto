const onError = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

//класс Api
class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  };

  getUserInfo() {
    return fetch (`${this._serverUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then (onError);
  };

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then (onError);
  };

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  };

  editProfile(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
    .then (onError);
  };

  editAvatar(url) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        avatar: url,
      })
    })
    .then (onError);
  };

  addCard(name, info) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
      body: JSON.stringify({
        name: name,
        link: info
      })
    })
    .then (onError);
  };

  deleteCard(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
    .then (onError)
  };

  addLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
    .then (onError);
  }

  deleteLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type']
      },
    })
    .then (onError);
  };
}

export { Api };
