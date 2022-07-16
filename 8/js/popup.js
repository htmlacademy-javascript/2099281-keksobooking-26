import {getWordEnding} from './utils/util.js';

const createOfferPopup = (author, offer) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapElement = cardTemplate.cloneNode(true);
  //заголовок объявления
  mapElement.querySelector('.popup__title').textContent = offer.title;
  //адрес
  mapElement.querySelector('.popup__text--address').textContent = `Адрес (координаты): ${offer.address.lat} , ${offer.address.lng}`;
  //цена
  mapElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  //тип жилья
  const offerTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };
  const translateOfferType = (type) => offerTypes[type];
  mapElement.querySelector('.popup__type').textContent = translateOfferType(offer.type);

  //скрыть пустой элемент или вернуть данные
  const hideEmptyElement = (value, element) => {
    if (!value) {
      element.classList.appendChild('hidden');
    } else {
      element.textContent = value;
    }
  };
  //количество гостей и комнат
  mapElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат${getWordEnding(offer.rooms,false)} для ${offer.gests} гост${getWordEnding(offer.gests,true)}`;
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
  const description = mapElement.querySelector('.popup__description');
  //offer.description = ' '; // Проверка фукнции
  hideEmptyElement(offer.description, description);
  //все фотографии
  const photosContainer = mapElement.querySelector('.popup__photos');
  const photos = photosContainer.querySelectorAll('.popup__photo');
  const photoTemplate = photos[0].cloneNode(true);
  photosContainer.innerHTML = '';

  offer.photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.setAttribute('src', photo);
    photosContainer.appendChild(newPhoto);
  });
  //аватар автора
  mapElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  return mapElement;
};

export {createOfferPopup};
