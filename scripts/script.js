// ПЕРЕМЕННЫЕ
// Редактирование профиля пользователя
const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupList = document.querySelectorAll('.popup'); // Попапы
const userTitle = document.querySelector('.profile__title'); // Имя в профиле на странице
const userDescription = document.querySelector('.profile__description'); // Род деятельности в профиле на странице

// Форма редактирования профиля пользователя
const profilePopup = document.querySelector('.popup-profile'); // Всплывающее окно редактирования профиля юзера
const formProfile = document.forms.formProfile; // Форма с полями
const profileName = formProfile.profileName; // Имя в форме
const profileDescription = formProfile.profileDescription; // Род деятельности в форме

// Добавление нового места
const addPlaceButton = document.querySelector('.profile__add-button'); // Кнопка добавления нового места
const placeTemplate = document.querySelector('#place-template').content; // Теплейт одного места в списке мест
const placesListContainer = document.querySelector('.places__list'); // Контейнер, в котором будем рендерить список мест

// Форма добавления нового места
const addPlacePopup = document.querySelector('.popup-place'); // Всплывающее окно добавления нового места
const formPlace = document.forms.formPlace; // Форма с данными о месте
const placeName = formPlace.placeName; // Название места в форме
const placeImage = formPlace.placeImage; // Ссылка на изображение в форме

// Всплывающее окно с изображением
const imagePopup = document.querySelector('.image-popup'); //Попап с изображением
const popupImage = imagePopup.querySelector('.popup__image'); //Изображение в попапе
const popupImageTitle = imagePopup.querySelector('.popup__image-description'); //Текст описания изображения в попапе

//Объект с данными для списка мест
const initialCards = [
  {
    name: 'Москва',
    link: 'https://kudamoscow.ru/uploads/e6e9e1d7c7ba9638527087eac4aa39b3.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Коллбэк листенера кнопки эскейп для вызова в функции открытия попапа
const escapeListener = (event) => {
  //Поскольку листенер мы повесили на документ, надо дополнительно найти попап, который открыт
  const targetPopup = document.querySelector('.popup_opened');

  //Отловить нажатие кнопки эскейп
  if(event.key === 'Escape') {
    //Закрыть попап
    togglePopup(targetPopup);
  }
};

// Функция открытия попапа (принимает объект - попап) переключает его класс (открыт/закрыт)
// Рефактор: также добавляет эвент листенеры при открытии и закрытии попапа
const togglePopup = target => {
  // Если у объекта нет класса "popup_opened", мы его добавляем по клику, иначе убираем класс "popup_opened"
  target.classList.toggle('popup_opened');

  //Нам придётся найти форму заново и мы не можем использовать переменную переданную в объекте в соседнем файле
  // const targetForm = target.querySelector('.form'); // Нашли форму в попапе, если она есть
  //
  // //Если попап открывает картинку, то нам не нужно производить каких-либо действий с формой
  // if (targetForm) {
  //   const submitButtonSelector = '.form__submit'; // Нашли кнопку
  //   const inactiveButtonClass = 'form__submit_inactive'; // Класс выключенной кнопки придется передавать строкой
  //   const inputSelector = '.form__input'; // Нашли инпуты
  //
  //   //Переиспользуем метод для отключения кнопки у формы если форма невалидна
  //   toggleSubmitButton(targetForm, submitButtonSelector, inactiveButtonClass, inputSelector);
  // }

  //Если объект открыт
  if (target.classList.contains('popup_opened')) {
    //добавляем листенер
    document.addEventListener('keydown', escapeListener);
  } else {
    //иначе удаляем листенер
    document.removeEventListener('keydown', escapeListener);
  }
};

// ~~Закрываем попап по клику на кнопку закрытия (сработает для всех форм, которые будут добавляться на страницу в будущем)~~
// Рефактор: событие теперь вешается не на кнопку закрытия попапа, а на весь попап, где вызывается для нужного элемента всплытием
popupList.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    // Проверяем, является ли целью клика нужный нам элемент
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      //Вызываем событие всплытием
      togglePopup(event.target.closest('.popup'));
    }
  });
});


//Открытие окна редактирования профиля: считываем значения из документа и вносим в поля формы
const toggleProfilePopup = () => {
  // Считываем значения из документа и записываем их в поля формы при открытии формы
  profileName.value = userTitle.textContent;
  profileDescription.value = userDescription.textContent;
  togglePopup(profilePopup); //Открываем попап
};

// Добавляем событие на открытие формы редактирования профиля по клику на кнопку редактирования профиля
editProfile.addEventListener('click', toggleProfilePopup);


// Отправка формы редактирования профиля пользователя
const profileFormSubmitHandler = event => {
  //Отменяем действие формы по умолчанию
  event.preventDefault();

  //Записываем значения из формы в элементы документа
  userTitle.textContent = profileName.value;
  userDescription.textContent = profileDescription.value;

  //Не забываем закрыть форму
  togglePopup(profilePopup);
}

//Отслиживаем форм сабмит для формы редактирования профиля пользователя
formProfile.addEventListener('submit', profileFormSubmitHandler);

//Листенер простановки лайка
const toggleLikeButton = event => {
  event.target.classList.toggle('place__like_status_active');
}

const removePlace = event => {
  event.target.closest('.place').remove();
}

//Функция формирования карточки места, принимает объект, возвращает карточку места
// {name: 'Название места', link: 'Ссылка на изображение места'}
const renderPlace = placeObject => {
  const renderTemplate = placeTemplate.cloneNode(true); //Клонируем темплейт для дальнейшего использования
  const placeTitle = renderTemplate.querySelector('.place__title'); //Название места
  const placeImage = renderTemplate.querySelector('.place__image'); //Изображение места
  const placeLikeButton = renderTemplate.querySelector('.place__like'); //Кнопка лайка
  const placeDeleteButton = renderTemplate.querySelector('.place__delete'); //Кнопка удаления места

  placeTitle.textContent = placeObject.name;

  //Перезаписываем изображение
  placeImage.src = placeObject.link; //Выставляем изображение
  placeImage.alt =  placeObject.name; //Выставляем альтернативный текст

  //Добавляем событие на лайк
  placeLikeButton.addEventListener('click', toggleLikeButton);

  //Добавить событие на удаление места из списка мест
  placeDeleteButton.addEventListener('click',  removePlace);

  //Добавляем событие на открытие попапа с просмотром изображения
  placeImage.addEventListener('click', () => {
    //При клике на картинку в карточке места мы рендерим её в попапе с изображением
    renderImagePopup(placeImage.src, placeTitle.textContent);
  })

  return renderTemplate; //Возвращаем готовый темплейт
}

//При загрузке страницы добавляем места внутрь списка мест по шаблону
initialCards.forEach(item => placesListContainer.append(renderPlace(item)));


//Обработчик нажатия на кнопку добавления места, открывает форму добавления места
addPlaceButton.addEventListener('click', () => {
  //Обнуляем значения формы перед её отображением
  placeName.value = '';
  placeImage.value = '';

  const placeForm = document.forms.formPlace; // Нашли форму в места, этот поиск придется выполнять потому что иначе никак
  //Ревьюер попросил перенести сюда?
  //Переиспользуем метод для отключения кнопки у формы если форма невалидна
  toggleSubmitButton(placeForm, validationSettings.submitButtonSelector, validationSettings.inactiveButtonClass, validationSettings.inputSelector);

  //Добавляем класс "открыто" форме добавления места
  togglePopup(addPlacePopup);
});


//Функция обработчик события отправки формы добавления нового места
const placeFormSubmitHandler = event => {
  //Мы отменяем дефолтное действие формы (отправку гет запроса)
  event.preventDefault();

  //Проверим поля на предмет ввода данных перед отправкой формы
  if (placeName.value !== '' && placeImage.value !== '') {
    //Создаем объект с параметрами, которые получили из формы
    const formSubmitResult = {}; //Объявили пустой объект (через const потому что попросил ревьюер, никак не привыкну что у констант можно перезаписывать значения свойств)
    formSubmitResult.name = placeName.value; //Записали имя из формы
    formSubmitResult.link = placeImage.value; //Записали ссылку на картинку из формы

    //Потом используем метод добавления события на страницу
    placesListContainer.append(renderPlace(formSubmitResult));
    //И закрываем форму
    togglePopup(addPlacePopup);
  } else {
    //Если поля пустые, выведем в консоль, ведь дизайнер не дал нам состояния инпутов
    // при отсутствии данных, а пустой сабмит сломает верстку.
    // console.log('Данные заполнены не полностью!!!');
  }
}

//Инициализируем события при отправке формы добавления места
formPlace.addEventListener('submit', placeFormSubmitHandler);

//Попап с изображениями: принимает название изображение и урл адрес, перезаписывает значения в попапе с изображением и отображает попап
//Реворк: решено сразу иметь на странице один попап с изображениями вместо пиздотряски с удалением и созданием дом элементов,
//потому что так тоже можно, и работает быстрее, и код читать легче, и куратор группы сказал так сделать, да и почему бы не сделать ещё и так, раз правлю код?
//Я конечно могу рендерить попап, а потом в него уже записывать значения, но ЗАЧЕМ?
const renderImagePopup = (imageUrl = '', imageTitle = '') => {
  popupImage.src = imageUrl; //Ссылка на изображение
  popupImage.alt = imageTitle; //Альтернативный текст картинки
  popupImageTitle.textContent = imageTitle; //Название изображения

  togglePopup(imagePopup); //После перезаписи значений показываем попап
}
