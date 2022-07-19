import {
  errorHandler,
  getWordEnding
} from './utils/util.js';
import {
  ROOM_PRICE_MAX,
  ROOM_PRICE_STEP,
} from './data/general.js';
import { postAdvertismentSingle } from './data/fetch-api.js';
import { resetDefaultMarker } from './map/map-api.js';
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

makeFormInactive(adForm);
makeFormInactive(document.querySelector('.map__filters'));

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const minOfferPrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
//Определяем вид предложения
const adOfferType = adForm.querySelector('#type');
const adOfferPrice = adForm.querySelector('#price');

//Пользователь может вписать цену в поле, а может указать её перемещением ползунка слайдера
const priceSlider = document.querySelector('.ad-form__slider');
noUiSlider.create(priceSlider, {
  start: Number(minOfferPrice[adOfferType.value]),
  connect: 'lower',
  range: {
    'min': Number(minOfferPrice[adOfferType.value]),
    'max': ROOM_PRICE_MAX
  },
  step: ROOM_PRICE_STEP,
  format: {
    to: function(value) { return Math.round(value); },
    from: function(value) { return Math.round(value); }
  }
});

// eslint-disable-next-line no-unused-vars
priceSlider.noUiSlider.on('update', (...rest) => {
  adOfferPrice.value = priceSlider.noUiSlider.get();
});

const checkFormData = (type) => {
  adOfferPrice.setAttribute('min', minOfferPrice[type.value]);
  adOfferPrice.setAttribute('placeholder', minOfferPrice[type.value]);

  priceSlider.noUiSlider.updateOptions( {
    start: Math.round(Number(minOfferPrice[type.value])),
    range: {
      'min': Math.round(Number(minOfferPrice[adOfferType.value])),
      'max': 100000
    },
  } );
};

adOfferPrice.addEventListener('change', ()=>priceSlider.noUiSlider.set(adOfferPrice.value)) ;
//Устанавливаем начальное минимальное значение при первой загрузке
checkFormData(adOfferType);
//Устанавливаем значения при изменении вида предложения.
adOfferType.addEventListener('change', () => {
  checkFormData(adOfferType);
});
//Поле «Количество комнат» синхронизировано с полем «Количество мест»
const adOfferRoomNumber = adForm.querySelector('#room_number');
const adOfferСapacity = adForm.querySelector('#capacity');
//функция для определения связки комнат и количества человек
const MAX_ROOMS_NUMBER = 100;
const CAPACITY = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
//Добавляем функцию проверки комнат и постояльцев
const capacityIsValid = () => CAPACITY[adOfferRoomNumber.value].includes(adOfferСapacity.value);
const capacityErrorMessage = () => `Ошибка: ${(adOfferСapacity.value < MAX_ROOMS_NUMBER) && (adOfferСapacity.value !== '0') ?
  `${adOfferRoomNumber.value} комнат${getWordEnding(adOfferRoomNumber.value, false)} не вмещает ${adOfferСapacity.value} гост${getWordEnding(adOfferRoomNumber.value, true)}` :
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
//Поля «Время заезда» и «Время выезда» синхронизированы
const adOfferCheckIn = adForm.querySelector('#timein');
const adOfferCheckOut = adForm.querySelector('#timeout');

adOfferCheckIn.addEventListener('change', () => {
  adOfferCheckOut.value = adOfferCheckIn.value;
});
adOfferCheckOut.addEventListener('change', () => {
  adOfferCheckIn.value = adOfferCheckOut.value;
});

//Очистка формы
const clearForm = () => {
  resetDefaultMarker();
};

//Добавляем пользовательскую проверку предложения
pristine.addValidator(adOfferСapacity, capacityIsValid, capacityErrorMessage);

const submitButton = adForm.querySelector('.ad-form__submit');

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
    postAdvertismentSingle(new FormData(evt.target), clearForm, errorHandler);
  }
  enableSubmitButton();
});

const resetButton = adForm.querySelector('.ad-form__reset');
//Обработка события очистки
resetButton.addEventListener('click', () => {
  clearForm();
});

export {makeFormInactive,makeFormActive,clearForm};
