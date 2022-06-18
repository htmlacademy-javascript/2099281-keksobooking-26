const getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, digits = 2) {
  min *= Math.pow(10,digits) ;
  max *= Math.pow(10,digits);
  return (getRandomInteger(min, max) / Math.pow(10,digits)).toFixed(digits);
};

getRandomInteger(0, 10);
getRandomFloat(0, 10, 2);
