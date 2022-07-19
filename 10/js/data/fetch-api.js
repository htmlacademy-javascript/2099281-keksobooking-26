import {systemMessage} from '../utils/util.js';
import {MESSAGE_TYPES} from './general.js';

const SERVER_URL = 'https://26.javascript.pages.academy/keksobooking';
const ADVERTISMENT_DATA_SERVICE = `${SERVER_URL}/data`;

// Функция загрузки объявлений
const getAdvertismentsAll = (onSuccess, onError) => {
  fetch(ADVERTISMENT_DATA_SERVICE)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then ((data)=>onSuccess(data));
      }
      {
        onError(response.status, response.statusText);
      }
    })
    .catch ((err) => {
      systemMessage( `Не удалось загрузить данные: ${err}`, false);
    });
};

const postAdvertismentSingle = (body, onError) => {
  fetch(SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        systemMessage('Объявление успешно размещено!',MESSAGE_TYPES['success']);
      } else {
        onError(response.status, response.statusText);
      }
    })
    .catch((err) => {
      systemMessage(`Не удалось отправить данные: ${err}`,false);
    });
};


export
{
  getAdvertismentsAll,
  postAdvertismentSingle
};


