import {author, offer} from './data/generation/datagen.js';
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapElement = cardTemplate.cloneNode(true);
//заголовок объявления
mapElement.querySelector('.popup__title').textContent = offer.title;
//адрес
mapElement.querySelector('.popup__text--address').textContent = `Координаты: ${offer.address.lat} , ${offer.address.lng}`;
//цена
mapElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
//тип жилья
const translateOfferType = function(type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default : return 'Отель';
  }
};
mapElement.querySelector('.popup__type').textContent = translateOfferType(offer.type);
//Функция для определения окончания числительного
const getCounterWordEnding = function(counter, modifier) {
  let endingCounter = 0;
  if ( counter > 20 ) {
    endingCounter =  counter % 10;
  }
  else {
    endingCounter = counter;
  }

  if ( !modifier ) {
    if (endingCounter === 1)  {
      return 'a';
    }
    else if (endingCounter < 5) {
      return 'ы';
    }
    else {
      return '';
    }
  }
  else {
    if (endingCounter === 1)  {
      return 'я';
    }
    else {
      return 'ей';
    }
  }
};
//количество гостей и комнат
mapElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат${getCounterWordEnding(offer.rooms,false)} для ${offer.gests} гост${getCounterWordEnding(offer.gests,true)}`;
//Время заезда и выезда
mapElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
// все доступные удобства
const featuresContainer = mapElement.querySelector('.popup__features');
const features = featuresContainer.querySelectorAll('.popup__feature');
const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);

features.forEach((feature) => {
  const modifier = feature.classList[1];
  if (!modifiers.includes(modifier)) {
    feature.remove();
  }
});
//описание объекта недвижимости
mapElement.querySelector('.popup__description').textContent = offer.description;
//все фотографии
const photosContainer = mapElement.querySelector('.popup__photos');
const photos = photosContainer.querySelectorAll('.popup__photo');
const photoTemplate = photos[0].cloneNode(true);
photosContainer.innerHTML = '';

offer.photos.forEach((photo) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.setAttribute('src',photo);
  photosContainer.appendChild(newPhoto);
});
//аватар автора
mapElement.querySelector('.popup__avatar').setAttribute('src',author.avatar);
//добавляем предложение
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(mapElement);

