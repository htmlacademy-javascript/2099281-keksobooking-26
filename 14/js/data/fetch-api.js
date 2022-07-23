import {systemMessage} from '../utils/util.js';
import {MESSAGE_TYPES} from './general.js';

const SERVER_URL = 'https://26.javascript.pages.academy/keksobooking';
const ADVERTISEMENT_DATA_SERVICE = `${SERVER_URL}/data`;
//Переменная для сохранение данных сервиса
let advertisementsData = [];

// Функция загрузки объявлений
const getAdvertisementsAll = (beforeLoad, onSuccess, onError) => {
  beforeLoad();
  fetch(ADVERTISEMENT_DATA_SERVICE)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then ((data)=> { advertisementsData=data; onSuccess(advertisementsData); });
      }
      {
        onError(response.status, response.statusText);
      }
    })
    .catch ((err) => {
      systemMessage( `Не удалось загрузить данные: ${err}`, false);
    });
};
//постинг формы документа
const postAdvertisementSingle = (body, onError) => {
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
  advertisementsData,
  getAdvertisementsAll,
  postAdvertisementSingle
};


