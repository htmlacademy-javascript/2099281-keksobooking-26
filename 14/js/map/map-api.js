import {
  activateInput,
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

//Создание карты с позициионированием на центр Токио
const map = L.map('map-canvas')

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
).addTo(map).on('load', () => {
  activateInput();
});

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
  // изменение адреса при сбросе маркера (по ТЗ)
  fillAddressCoordinates(COORDINATES_TOKIO_CENTER.lat,COORDINATES_TOKIO_CENTER.lng);
};

//Закрыть все Popup-ы
const closePopups = () => map.closePopup();

export {
  resetDefaultMarker,
  closePopups,
  createNewLayer,
  createNewMarker,
  addObjectToLayer,
  addPopupToMarker,
  resetMap,
};
