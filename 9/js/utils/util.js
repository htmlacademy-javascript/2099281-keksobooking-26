//Обработка клавиш
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
//Обработка системных сообщений
const MESSAGE_TIME_OUT = 1000;
const showMessage = (message) => {
  const messageContainer = document.createElement('div');
  const newMessage = document.createElement('p');
  newMessage.classList.add('system__message');
  newMessage.textContent = message;
  messageContainer.append(newMessage);
  document.body.append(messageContainer);
  this.setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_TIME_OUT);
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

//адрес
const fillAddressCoordinates = (lat, lng) => `${lat} , ${lng}`;

export {
  isEscapeKey,
  isEnterKey,
  showMessage,
  getWordEnding,
  fillAddressCoordinates
};
