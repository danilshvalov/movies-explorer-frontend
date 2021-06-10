import {ParsedTime} from '../types/types';
import {IMAGE_SERVER_URL} from './config';
import ApiError from '../errors/ApiError';
import {errorTexts} from './texts';

/**
 * Функция выравнивания количества
 *
 * Если шаг чётный или убрать мы не можем, то мы добавляем до границы
 *
 * Если шаг нечётный - убираем до границы
 * */
export function alignQuantity(currentCount: number, step: number): number {
  return step - (currentCount % step);
}

export const parseTime = (minutes: number): ParsedTime => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

/**
 * Функция переводит минуты в формат {H}ч{М}м или {M}м
 * */
export function stringifyTime({hours, minutes}: ParsedTime) {
  return hours && hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
}

export const getCopyrightDate = () => {
  const year = new Date().getFullYear();
  return year === 2021 ? '2021' : `2021 - ${year}`;
};

export function parseImage(path?: string) {
  return new URL(path || '', IMAGE_SERVER_URL).href;
}

export function errorParser(err: any): Promise<string> {
  if (err instanceof ApiError) {
    if (err.code >= 500) {
      return Promise.reject(errorTexts.internalServer);
    }

    err.res.json().then((res) => Promise.reject(res.message || errorTexts.internalServer));
  }

  return Promise.reject(errorTexts.internalServer);
}

export function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        return {
          data() {
            throw result;
          },
          isOk: false,
        };
      }

      if (status === 'success') {
        return {
          data() {
            return result;
          },
          isOk: true,
        };
      }

      throw suspender;
    },
  };
}
