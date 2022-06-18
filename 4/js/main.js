const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, digits = 2) {
//возведение в степень для того, чтобы учитывать количество разрядов при генерации чисел
  min *= Math.pow(10,digits);
  max *= Math.pow(10,digits);
  return (getRandomInteger(min, max) / Math.pow(10,digits)).toFixed(digits);
};

//Объявление всех используемых для генерации данных массивов
const allAvatars = Array.from( {length: 10}, (v, k) => k===9 ? `img/avatars/user${k+1}.png`: `img/avatars/user0${k+1}.png`) ; // Генерация массива аватарок авторов
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTimes = ['12:00', '13:00', '14:00'];
const checkoutTimes = checkinTimes.slice(); //так как значение checkout равны checkin, создаем копированием
const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const allPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg' ];

const author = {
  avatar : allAvatars[getRandomInteger(1,10)]
};

const someLocation = {
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5)
};

const offer = {
  title : 'Стандартное предложение',
  address : someLocation,
  price : getRandomInteger(10000,20000),
  type: types[getRandomInteger(0,4)],
  room: getRandomInteger(1,8),
  checkin: checkinTimes[getRandomInteger(0,2)],
  checkout: checkoutTimes[getRandomInteger(0,2)],
  features: Array.from( {length: getRandomInteger(0,4)}, (v, k) => allFeatures[k] ),
  description: 'С видом на море',
  photos: Array.from( {length: getRandomInteger(0,2)}, (v, k) => allPhotos[k] )
};

author.avatar = allAvatars[getRandomInteger(0,9)];
offer.title = 'Отличное предложение';
