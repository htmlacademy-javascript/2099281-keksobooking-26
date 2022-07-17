import {
  makeFormActive
} from '../form-api.js';

import {
  COORDINATES_TOKIO_CENTER,
  MAP_ZOOM
} from '../data/general.js';

import {
  mainPinIcon
} from './map-icons.js';

import {
  fillAddressCoordinates
} from '../utils/util.js';

//Создание карты с позициионированием на центр Токио
const map = L.map('map-canvas')
  .on('load', () => {
    makeFormActive(document.querySelector('.ad-form'));
    makeFormActive(document.querySelector('.map__filters'));
  })
  .setView({
    lat: COORDINATES_TOKIO_CENTER.lat,
    lng: COORDINATES_TOKIO_CENTER.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createNewMarker = (lat, lng, icon, draggable, element) => {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: draggable,
      icon: icon,
    }
  )
    .on('add', () => {
      if (element) {
        element.readOnly = true;
      }
    })
    .on('moveend', (evt) => {
      if (element) {
        const coorinates = evt.target.getLatLng();
        element.value = fillAddressCoordinates(coorinates.lat,coorinates.lng);
      }
    });
  return marker;
};

const addObject2Layer = (object, layer) => object.addTo(layer);
const addPopup2Marker = (marker,popup) => marker.bindPopup(popup);
const createNewLayer = () => {
  const newLayer = L.layerGroup().addTo(map);
  return newLayer;
};

// Сброс координат маркера
const resetMap = () => {
  map.setView({
    lat: COORDINATES_TOKIO_CENTER.lat,
    lng: COORDINATES_TOKIO_CENTER.lng,
  }, MAP_ZOOM );
};

// Создаем маркер по уполчанию, который будет отвечать за управление коррдинатами формы предложения
const defaultMarker = createNewMarker(COORDINATES_TOKIO_CENTER.lat, COORDINATES_TOKIO_CENTER.lng, mainPinIcon, true, document.getElementById('address'));
addObject2Layer(defaultMarker,map);

// Сброс координат маркера
const resetDefaultMarker = () => {
  defaultMarker.setLatLng({
    lat: COORDINATES_TOKIO_CENTER.lat,
    lng: COORDINATES_TOKIO_CENTER.lng,
  });
};

export {
  defaultMarker,
  resetDefaultMarker,
  createNewLayer,
  createNewMarker,
  addObject2Layer,
  addPopup2Marker,
  resetMap,
};

/*
//добавляем предложение
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createOfferPopup(author, offer));
/**/
