import {getAdvertismentsAll, } from './data/fetch-api.js';
import {createOfferPopup} from './popup.js';

//Интерфейс работы с картой, доступ к карте только через API
import {
  createNewLayer,
  createNewMarker,
  resetDefaultMarker,
  addObjectToLayer,
  addPopupToMarker
} from './map/map-api.js';

import {
  pinIcon
} from './map/map-icons.js';

import { errorHandler } from './utils/util.js';
// Функции размещения объявлений на карте
const placeAdvertismentOnMap = (advertisment, layer) => {
  const adMarker = createNewMarker(advertisment.location.lat, advertisment.location.lng, pinIcon, false);
  addObjectToLayer(adMarker,layer);
  addPopupToMarker(adMarker, createOfferPopup(advertisment.author, advertisment.offer, advertisment.location));
};

const placeAdvertisments = (advertisments) => {
  const newLayer = createNewLayer();
  advertisments.forEach((advertisment) => {
    placeAdvertismentOnMap(advertisment, newLayer);
  });
};

//placeAdvertisments(generatedAdvertisments);
getAdvertismentsAll(placeAdvertisments,errorHandler);
resetDefaultMarker();
