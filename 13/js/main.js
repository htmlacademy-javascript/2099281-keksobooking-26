//import { generatedAdvertisements } from './data/generation/datagen.js';
import { beforeLoad, onPageLoading } from './form-api.js';
import './map/map-api.js';
import { getAdvertisementsAll } from './data/fetch-api.js';
import { placeAdvertisements } from './map/map-manager.js';
import { errorHandler} from './utils/util.js';

//блокируем все формы на странице
onPageLoading();
//placeAdvertisements(generatedAdvertisements);
getAdvertisementsAll(beforeLoad,placeAdvertisements,errorHandler);

