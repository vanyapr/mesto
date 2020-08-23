class Api {
  //Конструктор принимает объект с настройками апи
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; //Урл адрес апи
    this._headers = headers; //Заголовки для передачи
  }

  //Почему бы не вынести обработчик ответа сервера в приватный метод апи?
  _processResponse (serverResponse) {
    if (serverResponse.ok) {
      return serverResponse.json(); //Если сервер ответил без ошибок, вернули данные в JSON
    }

    return Promise.reject(`Ошибка: ${serverResponse.status}`); //Иначе вернули ошибку, которая попадёт в catch
  }

  getData () { //Получение данных
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    }).then(this._processResponse);
  }

  saveData (body) { //Обновление данных
    return fetch(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._processResponse);
  }

  addData (body) { //Добавление данных
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._processResponse);
  }

  deleteData () {
    return fetch(this._baseUrl, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._processResponse);
  }

  putData () {
    return fetch(this._baseUrl, {
      method: 'PUT',
      headers: this._headers
    }).then(this._processResponse);
  }
}

export default Api
