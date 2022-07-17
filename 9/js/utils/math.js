const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DEFAULT_DIGITS = 2;
const getRandomFloat = (min, max, digits = DEFAULT_DIGITS) =>
//Возведение в степень для того, чтобы учитывать количество разрядов при генерации чисел
  (getRandomInteger(min * Math.pow(10, digits), max * Math.pow(10, digits)) / Math.pow(10, digits));

export{getRandomInteger,getRandomFloat};
