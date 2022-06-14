const randomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = function (min, max, digits = 2) {
  min *= 100;
  max *= 100;
  return (randomInteger(min, max) / 100).toFixed(digits);
};

randomInteger(0, 10);
randomFloat(0, 10, 2);
