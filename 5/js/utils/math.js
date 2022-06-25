const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, digits = 2) {
  //Возведение в степень для того, чтобы учитывать количество разрядов при генерации чисел
  return (getRandomInteger(min * Math.pow(10, digits), max * Math.pow(10, digits)) / Math.pow(10, digits));
};

export{getRandomInteger,getRandomFloat};
