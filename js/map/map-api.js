import {
  makeFormActive
} from '../form-api.js';

import {
  COORDINATES_TOKIO_CENTER,
  COORDINATES_DECIMAL_PLACES,
  MAP_ZOOM
} from '../data/general.js';

import {
  mainPinIcon
} from './map-icons.js';

import {
  fillAddressCoordinates
} from '../utils/util.js';

const COORDINATES_DECIMAL_PLACES = 5;

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
  //'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
  //  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
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
        element.value = fillAddressCoordinates(coorinates.lat.toFixed(COORDINATES_DECIMAL_PLACES),coorinates.lng.toFixed(COORDINATES_DECIMAL_PLACES));
      }
    });
  return marker;
};

const addObjectToLayer = (object, layer) => object.addTo(layer);
const addPopupToMarker = (marker,popup) => marker.bindPopup(popup);
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
addObjectToLayer(defaultMarker,map);

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
  addObjectToLayer,
  addPopupToMarker,
  resetMap,
};

/*
//добавляем предложение
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createOfferPopup(author, offer));
/**/
