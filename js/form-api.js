import {
  handleError,
  getWordEnding,
  fillAddressCoordinates
} from './utils/util.js';
import {
  FILE_TYPES,
  ROOM_PRICE_MAX,
  ROOM_PRICE_STEP,
} from './data/general.js';

import {
  postAdvertisementSingle
} from './data/fetch-api.js';
import {
  closePopups,
  resetDefaultMarker,
  resetMap
} from './map/map-api.js';
import {
  cleanMapFilters,
  refreshMap
} from './map/map-manager.js';

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const OFFER_PRICE_MIN = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
//функция для определения связки комнат и количества человек
const CAPACITY = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
//Максимальное количество комнат
const MAX_ROOMS_NUMBER = 100;

// Деактивация формы
const makeFormInactive = (form) => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((element) => {
    element.setAttribute('disabled', true);
  });
};
// Активация формы
const makeFormActive = (form) => {
  form.classList.remove('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((element) => {
    element.removeAttribute('disabled');
  });
};

//Начальная деактивация формы, до загрузки карты все должно быть в неактивном состоянии
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
//Адрес предложения
const adOfferAddress = adForm.querySelector('#address');
//Определяем вид предложения
const adOfferType = adForm.querySelector('#type');
const adOfferPrice = adForm.querySelector('#price');
//Поле «Количество комнат» синхронизировано с полем «Количество мест»
const adOfferRoomNumber = adForm.querySelector('#room_number');
const adOfferCapacity = adForm.querySelector('#capacity');
//Поля «Время заезда» и «Время выезда» синхронизированы
const adOfferCheckIn = adForm.querySelector('#timein');
const adOfferCheckOut = adForm.querySelector('#timeout');
//Объявление слайдера
const priceSlider = document.querySelector('.ad-form__slider');
//Кнопка отправки формы
const submitButton = adForm.querySelector('.ad-form__submit');
//Кнопка очистки
const resetButton = adForm.querySelector('.ad-form__reset');
//Деактивация при загрузке страницы
const deactivateForms = () => {
  makeFormInactive(adForm);
  makeFormInactive(mapFilters);
};
//Активация ввода
const activateInput = () => {
  makeFormActive(adForm);
};
//изменение адреса по местоположению
const changeDefaultAddress = (location) => {
  // изменение адреса при сбросе маркера (по ТЗ)
  adOfferAddress.value = fillAddressCoordinates(location.lat,location.lng);
};
//Пользователь может вписать цену в поле, а может указать её перемещением ползунка слайдера
noUiSlider.create(priceSlider, {
  start: Number(OFFER_PRICE_MIN[adOfferType.value]),
  connect: 'lower',
  range: {
    'min': Number(OFFER_PRICE_MIN[adOfferType.value]),
    'max': ROOM_PRICE_MAX
  },
  step: ROOM_PRICE_STEP,
  format: {
    to: function (value) {
      return Math.round(value);
    },
    from: function (value) {
      return Math.round(value);
    }
  }
});
//Обновление слайдера при изменении цены
const refreshPriceSlider = () => { priceSlider.noUiSlider.set(adOfferPrice.value); };
// eslint-disable-next-line no-unused-vars
priceSlider.noUiSlider.on('change', (...rest) => {
  adOfferPrice.value = priceSlider.noUiSlider.get();
});
//Проверка данных формы
const checkFormData = (type) => {
  adOfferPrice.setAttribute('min', OFFER_PRICE_MIN[type.value]);
  adOfferPrice.setAttribute('placeholder', OFFER_PRICE_MIN[type.value]);

  priceSlider.noUiSlider.updateOptions({
    start: Math.round(Number(OFFER_PRICE_MIN[type.value])),
    range: {
      'min': Math.round(Number(OFFER_PRICE_MIN[adOfferType.value])),
      'max': ROOM_PRICE_MAX
    },
  });
};
//Изменение цены
adOfferPrice.addEventListener('change', () => refreshPriceSlider());
//Устанавливаем начальное минимальное значение при первой загрузке
checkFormData(adOfferType);
//Устанавливаем значения при изменении вида предложения.
adOfferType.addEventListener('change', () => {
  checkFormData(adOfferType);
});
//Добавляем функцию проверки комнат и постояльцев
const isCapacityValid = () => CAPACITY[adOfferRoomNumber.value].includes(adOfferCapacity.value);
const showCpacityErrorMessage = () => `Ошибка: ${(adOfferCapacity.value < MAX_ROOMS_NUMBER) && (adOfferCapacity.value !== '0') ?
  `${adOfferRoomNumber.value} комнат${getWordEnding(adOfferRoomNumber.value, false)} не вмещает ${adOfferCapacity.value} гост${getWordEnding(adOfferRoomNumber.value, true)}` :
  `${MAX_ROOMS_NUMBER} комнат не для проживания гостей!`}`;
//Проверки сторонней библиотекой Pristine
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});
//Изменения времени заезда/выезда
adOfferCheckIn.addEventListener('change', () => {
  adOfferCheckOut.value = adOfferCheckIn.value;
});
adOfferCheckOut.addEventListener('change', () => {
  adOfferCheckIn.value = adOfferCheckOut.value;
});
//Очистка формы
const clearForm = () => {
  adForm.reset();
  refreshPriceSlider();
  resetMap();
  cleanMapFilters();
  closePopups();
  refreshMap();
  resetDefaultMarker();
};
// Сброс значений фильтров и блокировка
const processBeforeLoad = () => {
  makeFormInactive(mapFilters);
};
//Добавляем пользовательскую проверку предложения
pristine.addValidator(adOfferCapacity, isCapacityValid, showCpacityErrorMessage);
// Деактивация кнопки
const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет публикация...';
};
// Активация кнопки
const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
//Обработка события отправки
submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  disableSubmitButton();
  const isValid = pristine.validate();
  if (isValid) {
    postAdvertisementSingle(new FormData(adForm), clearForm, handleError);
  }
  enableSubmitButton();
});
//Обработка события очистки
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});
//Обработка загрузки фото
const loadPhoto = (input, output, newOutput ) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      if (newOutput) {
        const imgContainer = document.createElement('img');
        imgContainer.style.width = '70px';
        imgContainer.style.height = '70px';
        output.append(imgContainer);
        imgContainer.src = URL.createObjectURL(file);
      }else{
        output.src = URL.createObjectURL(file);
      }
    }
  });
};

loadPhoto (document.querySelector('.ad-form__field input[type=file]'), document.querySelector('.ad-form-header__preview img'), false );
loadPhoto (document.querySelector('.ad-form__upload input[type=file]'), document.querySelector('.ad-form__photo'), true);

export {
  makeFormActive,
  changeDefaultAddress,
  deactivateForms,
  processBeforeLoad,
  activateInput
};
