import {AmountDeviceSettings, DeviceWidthSettings} from './types';

export const startMoviesCardCount = 9;
export const addStep = 3;

export const moviesAmountByDevice: AmountDeviceSettings = {
  desktop: {
    startCount: 3,
    step: 3,
  },
  tablet: {
    startCount: 2,
    step: 2,
  },
  phone: {
    startCount: 5,
    step: 4,
  },
};

export const devicesWidth: DeviceWidthSettings = {
  desktop: 1280,
  tablet: 768,
  phone: 320,
};

export const pageLinks = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signIn: '/signin',
  signUp: '/signup',
};

export const sectionIds = {
  promo: 'promo', techs: 'techs', aboutProject: 'about-project', aboutMe: 'about-me',
};

export const externalLinks = {
  yandexPraktikum: 'https://praktikum.yandex.ru/',
  github: 'https://github.com/danilshvalov',
  telegram: 'https://t.me/danilshvalov',
  staticSite: 'https://github.com/danilshvalov/how-to-learn',
  adaptiveSite: 'https://github.com/danilshvalov/russian-travel',
  SPA: 'https://github.com/danilshvalov/react-mesto-api-full',
};
