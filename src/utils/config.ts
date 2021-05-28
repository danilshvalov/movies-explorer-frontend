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
  tablet: 720,
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
