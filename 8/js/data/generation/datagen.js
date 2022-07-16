import {getRandomInteger, getRandomFloat} from '../../utils/math.js';
//Объявление всех используемых для генерации данных массивов и констант
const NUMBER_OF_AVATARS = 10;
const AUTHOR_AVATARS = Array.from({ length: NUMBER_OF_AVATARS }, (item, index) => index === 9 ? `img/avatars/user${index + 1}.png` : `img/avatars/user0${index + 1}.png`); // Генерация массива аватарок авторов
// Название предложения
const offerTitles = {
  normal: 'Стандартное предложение',
  good: 'Хорошее предложение',
  best: 'Отличное предложение'
};
// Виды предложений
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
// Время въезда
const OFFER_CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
//Время выезда
const OFFER_CHECKOUT_TIMES = [...OFFER_CHECKIN_TIMES]; //так как значения checkout равны checkin, создаем копированием
//Дополнительные услуги
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator'
];
// Описание предложения
const OFFER_DESCRIPTION = [
  'С видом на море',
  'С видом на бассейн',
  'С видом на город',
  'C видом на двор',
  'C видом на стену',
  'Без окон',
];
// Фотографии предложения
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
// Автор
const author = {
  avatar: AUTHOR_AVATARS[getRandomInteger(1, 10)]
};
//Граничные значение координат
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
// Предложение
const someLocation = {
  lat: getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, 5),
  lng: getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5)
};
// Диапазон стоимости предложения
const PRICE_DAY_MIN = 10000;
const PRICE_DAY_MAX = 20000;
const NUMBER_MIN = 1;
const NUMBER_MAX = 8;

const offer = {
  title: offerTitles['normal'],
  address: someLocation,
  price: getRandomInteger(PRICE_DAY_MIN, PRICE_DAY_MAX),
  type: OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length-1)],
  rooms: getRandomInteger(NUMBER_MIN, NUMBER_MAX),
  gests: getRandomInteger(NUMBER_MIN, NUMBER_MAX),
  checkin: OFFER_CHECKIN_TIMES[getRandomInteger(0, OFFER_CHECKIN_TIMES.length-1)],
  checkout: OFFER_CHECKOUT_TIMES[getRandomInteger(0, OFFER_CHECKOUT_TIMES.length-1)],
  features: Array.from({ length: getRandomInteger(1, OFFER_FEATURES.length-1) }, (item, index) => OFFER_FEATURES[index]),
  description: OFFER_DESCRIPTION[getRandomInteger(0, OFFER_DESCRIPTION.length-1)],
  photos: Array.from({ length: getRandomInteger(1, OFFER_PHOTOS.length-1) }, (item, index) => OFFER_PHOTOS[index])
};

// Временный вызов неиспользуемых объектов
// Дополнительные функции для вывода в консоль
const changeTitle = () => {
  switch (offer.description) {
    case OFFER_DESCRIPTION[0]: //Вид на море
      return offerTitles['best'];
    case OFFER_DESCRIPTION[1]: //Вид на бассейн
      return offerTitles['good'];
    default: //Здесь лучше не останавливаться
      return offerTitles['normal'];
  }
};

offer.title = changeTitle();

export {author,offer};


