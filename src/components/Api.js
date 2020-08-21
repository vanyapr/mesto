class Api {
  //Конструктор принимает объект с настройками апи
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; //Урл адрес апи
    this._headers = headers; //Заголовки для передачи
    this._data = {}
  }

  getData () { //Геттер
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    }).then(data => data.json());  //Преобразовали полученные данные в json
  }

  saveData (body) { //Сеттер
    console.log(body);
    return fetch(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(data => data.json())
  }

  addData (body) {
    console.log(body);
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(data => data.json())
  }
}

export default Api
