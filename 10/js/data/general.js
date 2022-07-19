//Центр Токио
const COORDINATES_TOKIO_CENTER = {
  lat: 35.681729,
  lng: 139.753927,
};

const MESSAGE_TYPES = {
  error: 'E',
  warning: 'W',
  success: 'S',
};

//Максимальная цена предложения
const ROOM_PRICE_MAX = 100000;
//Максимальная цена предложения
const ROOM_PRICE_STEP = 100;
//количество знаков после запятой для координат
const COORDINATES_DECIMAL_PLACES = 5;

// Начальный масштаб карты
const MAP_ZOOM = 13;

//тип жилья
const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const AD_NUMBER = 5;

export {
  MESSAGE_TYPES,
  COORDINATES_TOKIO_CENTER,
  COORDINATES_DECIMAL_PLACES,
  ROOM_PRICE_MAX,
  ROOM_PRICE_STEP,
  OFFER_TYPES,
  MAP_ZOOM,
  AD_NUMBER,
};
