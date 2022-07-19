import {
  getWordEnding,
  fillAddressCoordinates
} from './utils/util.js';

import {
  OFFER_TYPES
} from './data/general.js';


const createOfferPopup = (author, offer, location) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapElement = cardTemplate.cloneNode(true);

  //скрыть пустой элемент или вернуть данные
  const assignTextElement = (value, element) => {
    if (!value) {
      element.classList.add('hidden');
    } else {
      element.textContent = value;
    }
  };
  //заголовок объявления
  assignTextElement(offer.title, mapElement.querySelector('.popup__title'));
  //адрес
  if ('address' in offer) {
    mapElement.querySelector('.popup__text--address').textContent = offer.address.value !== '' ? `Адрес (координаты): ${fillAddressCoordinates(location.lat, location.lng)}` : offer.address.value;
  }
  else {
    mapElement.querySelector('.popup__text--address').textContent = `Адрес (координаты): ${fillAddressCoordinates(location.lat, location.lng)}`;
  }
  //цена
  const priceText = (price) =>(price > 0) ? `${price} ₽/ночь` : '';
  assignTextElement(priceText(offer.price),mapElement.querySelector('.popup__text--price'));

  const translateOfferType = (type) => OFFER_TYPES[type];

  assignTextElement(translateOfferType(offer.type), mapElement.querySelector('.popup__type'));

  //количество гостей и комнат
  const capacityText = (offer.gests>0) ? `${offer.rooms} комнат${getWordEnding(offer.rooms,false)} для ${offer.gests} гост${getWordEnding(offer.gests,true)}` : `${offer.rooms} комнат${getWordEnding(offer.rooms,false)} не для гостей`;
  mapElement.querySelector('.popup__text--capacity').textContent = capacityText;

  //Время заезда и выезда
  mapElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // все доступные удобства
  const featuresContainer = mapElement.querySelector('.popup__features');
  let features = featuresContainer.querySelectorAll('.popup__feature');
  if ('features' in offer) {
    const modifiers = offer.features.map((feature) => {
      const featureName = `popup__feature--${feature}`;
      return featureName;
    });
    features.forEach((feature) => {
      const modifier = feature.classList[1];
      if (!modifiers.includes(modifier)) {
        feature.remove();
      }
    });
  }
  else {
    features = [];
    featuresContainer.classList.add('hidden');
  }

  //описание объекта недвижимости
  mapElement.querySelector('.popup__description').textContent = offer.description;
  //все фотографии
  const photosContainer = mapElement.querySelector('.popup__photos');
  let photos = photosContainer.querySelectorAll('.popup__photo');
  const photoTemplate = photos[0].cloneNode(true);

  photosContainer.innerHTML = '';
  if ('photos' in offer) {
    offer.photos.forEach((photo) => {
      const newPhoto = photoTemplate.cloneNode(true);
      newPhoto.setAttribute('src', photo);
      photosContainer.appendChild(newPhoto);
    });
  }
  else {
    photos = [];
    photosContainer.classList.add('hidden');
  }
  //аватар автора

  mapElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  return mapElement;

};

export {
  createOfferPopup
};
