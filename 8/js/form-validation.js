import {
  getWordEnding
} from './utils/util.js';
//подключение слайдера noUiSlider для управление ценой
//import * as noUiSlider from '../node_modules/nouislider/dist/nouislider.js';
// Деактивация формы
const makeFormInactive = (form) => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((element) => {
    element.setAttribute('disabled', true);
  });
};
/*
// Активация формы
const makeFormActive = (form) => {
  form.classList.remove('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((element) => {
    element.setAttribute('disabled', false);
  });
};
/**/
//Начальная деактивация формы, до загрузки карты все должно быть в неактивном состоянии
const adForm = document.querySelector('.ad-form');
//makeFormInactive(adForm);
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

const checkFormData = (type) => {
  adOfferPrice.setAttribute('min', minOfferPrice[type.value]);
  adOfferPrice.setAttribute('placeholder', minOfferPrice[type.value]);
  /*
  console.log(noUiSlider);
  //Пользователь может вписать цену в поле, а может указать её перемещением ползунка слайдера
  const priceSlider = document.querySelector('.ad-form__slider');

  noUiSlider.create(priceSlider, {
    start: [minOfferPrice[type.value]],
    connect: true,
    range: {
      'min': minOfferPrice[type.value],
      'max': 100000
    }
  }
  );
  /* */
};
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
//Добавляем пользовательскую проверку предложения
pristine.addValidator(adOfferСapacity, capacityIsValid, capacityErrorMessage);

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
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

/**/
