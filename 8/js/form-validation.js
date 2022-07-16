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
  adOfferPrice.setAttribute('min',minOfferPrice[type.value]);
  adOfferPrice.setAttribute('placeholder',minOfferPrice[type.value]);
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
adOfferType.addEventListener('change',() => { checkFormData(adOfferType); } );
//Поле «Количество комнат» синхронизировано с полем «Количество мест»
const adOfferRoomNum = adForm.querySelector('#room_number');
const adOffercapacity = adForm.querySelector('#capacity');
//функция для определения связки комнат и количества человек
const getMaxNumber = (value) => {
  switch (value) {
    case 0: return 100;
    case 100: return 0;
    default: return value;
  }
};
// Функция установки лимитов на элементы
const setElementLim = (element, value ) => {
  let min = 1;
  let max = getMaxNumber(value);
  if (min > max) {
    max = min;
  }
  if (max === 100) {
    min = max;
  }
  element.setAttribute('min',min);
  element.setAttribute('max',max);
};
//При изменении значений, меняем лимиты связанных элеменов
adOfferRoomNum.addEventListener('change',() => { setElementLim(adOffercapacity, adOfferRoomNum.value); } );
adOffercapacity.addEventListener('change',() => { setElementLim(adOfferRoomNum, adOffercapacity.value); } );

//console.log(adOffercapacity.getAttribute('max'));
const pristine = new Pristine(adForm);

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid || (adOfferRoomNum.value === 100 & adOffercapacity.value>0)
               || (adOffercapacity.value === 0 & adOfferRoomNum.value<100)
               || (adOffercapacity.value !== adOfferRoomNum.value & adOfferRoomNum.value !== 100))
  {
    return evt.preventDefault();
  }
});

/**/
