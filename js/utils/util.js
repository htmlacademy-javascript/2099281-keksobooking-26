import {
  TIMEOUT_DELAY
} from '../data/general.js';
//Обработка клавиш
const isEscapeKey = (evt) => evt.key === 'Escape';
//Удаление сообщения
const removeMessage = (success) => {
  let currentMessage = null;
  if (success) {
    currentMessage = document.querySelector('.success');
  } else {
    currentMessage = document.querySelector('.error');
  }
  //Так как сразу несколько событий могут пытаться удалить сообщение необходимо убедиться, что сообщение существует
  if (currentMessage) {
    currentMessage.remove();
  }
};
//Показать сообщение
const showSystemMessage = (message, success, custom) => {
  let alertTemplate = '';
  if (success) {
    alertTemplate = document.querySelector('#success');
  } else {
    alertTemplate = document.querySelector('#error');
  }
  const alertContainer = alertTemplate.cloneNode(true);
  const alertMessage = alertContainer.content.querySelector('p');
  alertMessage.textContent = message;
  if (custom) {
    //собстевенный стиль для сообщения об ошибке
    alertMessage.classList.add('custom-error__message');
  }
  document.body.append(alertContainer.content);
  if (!success) {
    //Удаление ошибки по кнопке Escape
    document.querySelector('.error__button').addEventListener('click', () => {
      document.querySelector('.error').remove();
    });
  }
  //Удаление сообщения по нажатию кнопки Escape
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage(success);
    }
  });
  document.addEventListener('click',() => removeMessage(success), { once: true });
};
//Функция для определения окончания числительного
const getWordEnding = (counter, modifier) => {
  const endingCounter = counter % 10;

  if (!modifier) {
    if (endingCounter === 1) {
      return 'a';
    }
    if (endingCounter < 5) {
      return 'ы';
    } else {
      return '';
    }
  } else {
    if (endingCounter === 1) {
      return 'я';
    } else {
      return 'ей';
    }
  }
};
// Функция обработки ошибок
const handleError = (status, statusText) => {
  let errMessage = `${status} ${statusText}`;
  switch (status) {
    case 400:
      errMessage = `Клиент: ${errMessage}`;
      break;
    case 500:
      errMessage = `Сервер: ${errMessage}`;
      break;
    default:
      break;
  }
  throw (errMessage);
};
//адрес
const fillAddressCoordinates = (lat, lng) => `${lat} , ${lng}`;
//Функция debounce для устранения дребезга:
const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);
    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};
//Обработчик событий любого элемента
const addKeyEventListener = (element, onChange) => element.addEventListener('change', () => {
  onChange();
});

export {
  showSystemMessage,
  getWordEnding,
  fillAddressCoordinates,
  handleError,
  addKeyEventListener,
  debounce
};
