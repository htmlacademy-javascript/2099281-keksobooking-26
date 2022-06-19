const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, digits = 2) {
  //Возведение в степень для того, чтобы учитывать количество разрядов при генерации чисел
  const min_ = min*Math.pow(10, digits);
  const max_ = max*Math.pow(10, digits);
  return (getRandomInteger(min_, max_) / Math.pow(10, digits));
};

//Объявление всех используемых для генерации данных массивов и констант
const NUMBER_OF_AVATARS = 10;
const AUTHOR_AVATARS = Array.from({ length: NUMBER_OF_AVATARS }, (item, index) => index === 9 ? `img/avatars/user${index + 1}.png` : `img/avatars/user0${index + 1}.png`); // Генерация массива аватарок авторов

const offerTitles = {
  normal: 'Стандартное предложение',
  good: 'Хорошее предложение',
  best: 'Отличное предложение'
};

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const OFFER_CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const OFFER_CHECKOUT_TIMES = [...OFFER_CHECKIN_TIMES]; //так как значения checkout равны checkin, создаем копированием

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator'
];

const OFFER_DESCRIPTION = [
  'С видом на море',
  'С видом на бассейн',
  'С видом на город',
  'C видом на двор',
  'C видом на стену',
  'Без окон',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const author = {
  avatar: AUTHOR_AVATARS[getRandomInteger(1, 10)]
};

const someLocation = {
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5)
};

const offer = {
  title: offerTitles['normal'],
  address: someLocation,
  price: getRandomInteger(10000, 20000),
  type: OFFER_TYPES[getRandomInteger(0, 4)],
  room: getRandomInteger(1, 8),
  checkin: OFFER_CHECKIN_TIMES[getRandomInteger(0, 2)],
  checkout: OFFER_CHECKOUT_TIMES[getRandomInteger(0, 2)],
  features: Array.from({ length: getRandomInteger(0, 4) }, (item, index) => OFFER_FEATURES[index]),
  description: OFFER_DESCRIPTION[getRandomInteger(0, 5)],
  photos: Array.from({ length: getRandomInteger(0, 2) }, (item, index) => OFFER_PHOTOS[index])
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

author.avatar = AUTHOR_AVATARS[getRandomInteger(0, 9)];
offer.title = changeTitle();
