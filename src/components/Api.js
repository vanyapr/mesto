class Api {
  //Конструктор принимает объект с настройками апи
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getData () {
    fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    }).then(data => data.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  getCardsList () {

  }
}

export default Api
