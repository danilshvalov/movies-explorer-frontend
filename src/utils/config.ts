import {AmountDeviceSettings, DeviceWidthSettings} from '../types/types';

export const MOVIES_AMOUNT_BY_DEVICE: AmountDeviceSettings = {
  desktop: {
    startCount: 3,
    step: 3,
  },
  tablet: {
    startCount: 2,
    step: 2,
  },
  phone: {
    startCount: 4,
    step: 1,
  },
};

export const DEVICES_WIDTHS: DeviceWidthSettings = {
  desktop: 1280,
  tablet: 768,
  phone: 320,
};

export const PAGE_LINKS = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signIn: '/signin',
  signUp: '/signup',
};

export const SECTIONS_IDS = {
  promo: 'promo',
  techs: 'techs',
  aboutProject: 'about-project',
  aboutMe: 'about-me',
};

export const EXTERNAL_LINKS = {
  yandexPraktikum: 'https://praktikum.yandex.ru/',
  github: 'https://github.com/danilshvalov',
  telegram: 'https://t.me/danilshvalov',
  staticSite: 'https://github.com/danilshvalov/how-to-learn',
  adaptiveSite: 'https://github.com/danilshvalov/russian-travel',
  SPA: 'https://github.com/danilshvalov/react-mesto-api-full',
};

// export const BACKEND_URL = 'https://api.ds.movies-explorer.nomoredomains.icu';
export const BEATFILM_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BACKEND_URL = 'http://localhost:5000';
export const IMAGE_SERVER_URL = 'https://api.nomoreparties.co/';
export const LOCAL_STORAGE_KEYS = {
  savedMovies: 'saved-movies',
};
