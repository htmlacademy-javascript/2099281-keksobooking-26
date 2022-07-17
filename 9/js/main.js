import './utils/math.js';
import './data/generation/datagen.js';
import './form-api.js';
import './map/map-api.js';

import {
  generateRandomAuthor,
  generateRandomOffer

} from './data/generation/datagen.js';

import {
  createOfferPopup
} from './popup.js';

//Интерфейс работы с картой, доступ к карте только через API
import {
  createNewLayer,
  createNewMarker,
  resetDefaultMarker,
  addObject2Layer,
  addPopup2Marker
} from './map/map-api.js';

import {
  pinIcon
} from './map/map-icons.js';

import {
  AD_NUMBER
} from './data/general.js';

//Создадим новый слой , на котором будем размещать все объекты
const adLayer = createNewLayer();
//Создаем заданное в общих данных количество предложений
for(let i = 0; i < AD_NUMBER; i++){
  const adOffer = generateRandomOffer();
  const adMarker = createNewMarker(adOffer.address.lat, adOffer.address.lng, pinIcon, false);
  addObject2Layer(adMarker,adLayer);
  addPopup2Marker(adMarker, createOfferPopup(generateRandomAuthor(), adOffer));
}

resetDefaultMarker();
