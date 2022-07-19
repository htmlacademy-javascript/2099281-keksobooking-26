import { MESSAGE_TYPES } from '../data/general.js';

//Обработка клавиш
const isEscapeKey = (evt) => evt.key === 'Escape';
//const isEnterKey = (evt) => evt.key === 'Enter';
//Обработка системных сообщений
const MESSAGE_TIME_OUT = 5000;

const showMessage = (message,type) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.alignSelf = 'center';
  const newMessage = document.createElement('p');
  newMessage.classList.add('custom-message');
  switch (type) {
    case MESSAGE_TYPES['error']:
      newMessage.classList.add('custom-error__message');
      break;
    case MESSAGE_TYPES['warning']:
      newMessage.classList.add('custom-warning__message');
      break;
    default:
      newMessage.classList.add('custom-success__message');
      break;
  }

  newMessage.textContent = message;
  messageContainer.append(newMessage);
  const mapCanvas = document.getElementById('map-canvas');
  mapCanvas.parentNode.insertBefore(messageContainer, mapCanvas);


  setTimeout(() => messageContainer.remove(), MESSAGE_TIME_OUT);
};


const systemMessage = (message,success) => {
  let alertTemplate = '';

  if (success) {
    alertTemplate = document.querySelector('#success');
  } else {
    alertTemplate = document.querySelector('#error');
  }

  const alertContainer = alertTemplate.cloneNode(true);
  const alertMessage = alertContainer.content.querySelector('p');
  alertMessage.style.zIndex = '100';
  alertMessage.style.position = 'absolute';
  alertMessage.style.left = '0';
  alertMessage.style.top = '0';
  alertMessage.style.right = '0';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textAlign = 'center';
  if (success) {
    alertMessage.style.backgroundColor = 'green';
  }
  else {
    alertMessage.style.backgroundColor = 'red';
  }
  alertMessage.textContent = message;
  document.body.append(alertContainer.content);
  if (success) {
    setTimeout(() => {
      document.querySelector('.success').remove();
    }, MESSAGE_TIME_OUT);
  }
  else{
    document.querySelector('.error__button').addEventListener('click', () => {
      document.querySelector('.error').remove();
    }
    );
  }
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (success) {
        document.querySelector('.success').remove();
      }
      else {
        document.querySelector('.error').remove();
      }
    }
  });
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

const errorHandler = (status, statusText) => {
  let errMessage = `${status} ${statusText}`;
  switch (status) {
    case 400: errMessage = `Клиент: ${errMessage}`;
      break;
    case 500: errMessage = `Сервер: ${errMessage}`;
      break;
    default:
      break;
  }
  throw( errMessage );
};
//адрес
const fillAddressCoordinates = (lat, lng) => `${lat} , ${lng}`;

export {
  isEscapeKey,
  showMessage,
  systemMessage,
  getWordEnding,
  fillAddressCoordinates,
  errorHandler
};
