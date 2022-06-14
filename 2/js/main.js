const randomInteger = function (min, max) {
  if (min >= max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = function (min, max, digits = 2) {
  if (min >= max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
};

randomInteger(0, 1);
randomFloat(0,1,2);
