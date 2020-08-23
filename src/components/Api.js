class Api {
  //Конструктор принимает объект с настройками апи
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; //Урл адрес апи
    this._headers = headers; //Заголовки для передачи
  }

  getData () { //Получение данных
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    }).then(serverResponce => {
      if (serverResponce.ok) {
        return serverResponce.json(); //Если сервер ответил без ошибок, вернули данные в JSON
      }

      return Promise.reject(`Ошибка: ${serverResponce.status}`); //Иначе вернули ошибку
    });
  }

  saveData (body) { //Обновление данных
    return fetch(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(serverResponce => {
      if (serverResponce.ok) {
        return serverResponce.json(); //Если сервер ответил без ошибок, вернули данные в JSON
      }

      return Promise.reject(`Ошибка: ${serverResponce.status}`); //Иначе вернули ошибку
    });
  }

  addData (body) { //Добавление данных
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(serverResponce => {
      if (serverResponce.ok) {
        return serverResponce.json(); //Если сервер ответил без ошибок, вернули данные в JSON
      }

      return Promise.reject(`Ошибка: ${serverResponce.status}`); //Иначе вернули ошибку
    });
  }

  deleteData () {
    return fetch(this._baseUrl, {
      method: 'DELETE',
      headers: this._headers
    }).then(serverResponce => {
      if (serverResponce.ok) {
        return serverResponce.json(); //Если сервер ответил без ошибок, вернули данные в JSON
      }

      return Promise.reject(`Ошибка: ${serverResponce.status}`); //Иначе вернули ошибку
    });
  }

  putData () {
    return fetch(this._baseUrl, {
      method: 'PUT',
      headers: this._headers
    }).then(serverResponce => {
      if (serverResponce.ok) {
        return serverResponce.json(); //Если сервер ответил без ошибок, вернули данные в JSON
      }

      return Promise.reject(`Ошибка: ${serverResponce.status}`); //Иначе вернули ошибку
    });
  }
}

export default Api
