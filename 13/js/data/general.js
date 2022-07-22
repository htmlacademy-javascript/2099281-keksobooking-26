//Центр Токио
const COORDINATES_TOKIO_CENTER = {
  lat: 35.681729,
  lng: 139.753927,
};

//Виды сообщений для собственного вида сообщений
const MESSAGE_TYPES = {
  error: 'E',
  warning: 'W',
  success: 'S',
};

//тип жилья
const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//Максимальная цена предложения
const ROOM_PRICE_MAX = 100000;
//Максимальная цена предложения
const ROOM_PRICE_STEP = 100;
//количество знаков после запятой для координат
const COORDINATES_DECIMAL_PLACES = 5;
// Начальный масштаб карты
const MAP_ZOOM = 13;
// Не фильтровать
const NO_FILTER = 'any';
// Количество генерируемых объявлений
const ADVERTISEMENTS_GENERATED_MAX = 5;
//Количество отображаемых объявлений
const ADVERTISEMENTS_DISPLAY_MAX = 10;
//timeout
const TIMEOUT_DELAY = 2000;

export {
  MESSAGE_TYPES,
  FILE_TYPES,
  COORDINATES_TOKIO_CENTER,
  COORDINATES_DECIMAL_PLACES,
  ROOM_PRICE_MAX,
  ROOM_PRICE_STEP,
  OFFER_TYPES,
  MAP_ZOOM,
  NO_FILTER,
  ADVERTISEMENTS_GENERATED_MAX,
  ADVERTISEMENTS_DISPLAY_MAX,
  TIMEOUT_DELAY
};
