import {
  ADVERTISEMENTS_DISPLAY_MAX,
  NO_FILTER
} from '../data/general.js';

import {
  createOfferPopup
} from '../popup.js';
import {
  pinIcon
} from './map-icons.js';

//Интерфейс работы с картой, доступ к карте только через API
import {
  createNewLayer,
  createNewMarker,
  addObjectToLayer,
  addPopupToMarker
} from './map-api.js';
import {
  makeFormActive
} from '../form-api.js';

import {
  advertisementsData
} from '../data/fetch-api.js';

import {
  addEventListener, debounce
} from '../utils/util.js';

// Функции размещения объявлений на карте
const placeAdvertisementOnMap = (advertisement, layer) => {
  const adMarker = createNewMarker(advertisement.location.lat, advertisement.location.lng, pinIcon, false);
  addObjectToLayer(adMarker, layer);
  addPopupToMarker(adMarker, createOfferPopup(advertisement.author, advertisement.offer, advertisement.location));
};
// Пороговые начения цен
const PRICE_TYPES = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: NO_FILTER
  },
};

//Сравнение стоимости номер с границей диапазона цен
const comparePrices = (price, filter) => (price - filter) < 0;
//Фильтрация по удобствам
const checkFasilities = (facilities, features) => {
  //Считаем, что по умолчанию все удобства есть
  let exists = true;
  //пробегаем по всем отфильтрованным удобствам
  facilities.filter((facility) => facility.value === true).forEach((facility) => {
    //как только не находим первое из удобств, прекращаем работу фильтра
    if (!exists) { return exists; }
    //смотрим, что отмеченно удобство есть в предложении
    exists = features.includes(facility.name);
    return exists;
  } );
  return exists;
};
//фильтры карты
const filterMap = (adertisement, type, price, rooms, guests, facilities, allfacilities) => {
  //проверка всех фильтров
  if (type !== NO_FILTER & type !== adertisement.offer.type) {
    return false;
  }
  if (price !== NO_FILTER) {
    if (comparePrices(adertisement.offer.price, PRICE_TYPES[price].min)) {
      return false;
    }
    if (PRICE_TYPES[price].max !== NO_FILTER & !comparePrices(adertisement.offer.price, PRICE_TYPES[price].max)) {
      return false;
    }
  }
  if (rooms !== NO_FILTER) {
    if (Number(rooms) !== adertisement.offer.rooms) {
      return false;
    }
  }
  if (guests !== NO_FILTER) {
    if (Number(guests) !== adertisement.offer.guests) {
      return false;
    }
  }
  if ('features' in adertisement.offer) {
    if (!allfacilities) {
      //проверка всех свойств
      if ( !checkFasilities(facilities,adertisement.offer.features) ) {
        return false;
      }
    }
  } else {
    return false;
  }
  // Возвращаем успех
  return true;
};

const addfacility = (name, value, facilities) => {
  const facility = {};
  facility['name'] = name;
  facility['value'] = value;
  facilities.push(facility);
};

// Получаем значение всех фильтров один раз
const mapFilters = document.querySelector('.map__filters');
// Поиск не удовлетворяющих условий
const elementPrice = mapFilters.querySelector('#housing-price');
const elementType = mapFilters.querySelector('#housing-type');
const elementRooms = mapFilters.querySelector('#housing-rooms');
const elementGuests = mapFilters.querySelector('#housing-guests');
const elementsFacilities = document.querySelector('.map__features').querySelectorAll('input[type=checkbox]');
// Очистка фильтров
const mapFiltersCleaner = () => {
  elementPrice.value = NO_FILTER;
  elementType.value = NO_FILTER;
  elementRooms.value = NO_FILTER;
  elementGuests.value = NO_FILTER;
  elementsFacilities.forEach((element) => {
    element.checked = false;
  });
};

// Проверка, что все фильтры доп.услуг пустые
const allFasilitiesFiltersAreEmpty = (array) => array.every((element) => {
  if (element.value) {
    return false;
  } else {
    return true;
  }
});

//Собираем слои, на которых размещаются объявления
const advertLayersCollector = [];
const clearAdvertLayers = () => {
  advertLayersCollector.forEach((layer) => layer.remove());
};
//Размещение предложений
const placeAdvertisements = (advertisements) => {
  //Получаем дополнительные фильтры по facilities
  const filterFacilities = [];
  document.querySelector('.map__features').querySelectorAll('input[type=checkbox]').forEach((input) => addfacility(input.value, input.checked, filterFacilities));
  //Если ни одна из опций не выбрана
  const anyFacilities = allFasilitiesFiltersAreEmpty(filterFacilities);
  //Делаем копию для фильтрации полученных данных
  const advertisementFiler = advertisements.filter((advertisement) => filterMap(advertisement, elementType.value, elementPrice.value, elementRooms.value, elementGuests.value, filterFacilities, anyFacilities)).slice(0, ADVERTISEMENTS_DISPLAY_MAX);
  //слой, на котором размещаем все точки
  const newLayer = createNewLayer();
  advertisementFiler.forEach((advertisement) => {
    placeAdvertisementOnMap(advertisement, newLayer);
  });
  advertLayersCollector.push(newLayer);
  makeFormActive(mapFilters);
};

const refreshMap = () => {
  clearAdvertLayers();
  placeAdvertisements(advertisementsData);
};

//Контроль изменения фильтров
addEventListener(elementPrice, debounce(refreshMap));
addEventListener(elementType, debounce(refreshMap));
addEventListener(elementRooms, debounce(refreshMap));
addEventListener(elementGuests, debounce(refreshMap));
elementsFacilities.forEach((element) => {
  addEventListener(element, debounce(refreshMap));
});

export {
  refreshMap,
  placeAdvertisements,
  clearAdvertLayers,
  mapFiltersCleaner
};
