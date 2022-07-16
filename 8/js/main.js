import './utils/math.js';
import './data/generation/datagen.js';

import {
  author,
  offer
} from './data/generation/datagen.js';

import {
  createOfferPopup
} from './popup.js';

import './form-validation.js';

//добавляем предложение
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createOfferPopup(author, offer));
