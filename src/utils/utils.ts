import {ParsedTime} from 'types/types';
import {IMAGE_SERVER_URL} from '@utils/config';
/**
 * Функция выравнивания количества
 *
 * Если шаг чётный или убрать мы не можем, то мы добавляем до границы
 *
 * Если шаг нечётный - убираем до границы
 * */

export function parseTime(minutes: number): ParsedTime {
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
}

/**
 * Функция переводит минуты в формат {H}ч{М}м или {M}м
 * */
export function stringifyTime({hours, minutes}: ParsedTime): string {
  return hours && hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
}

export function getCopyrightDate(): string {
  const year = new Date().getFullYear();
  return year === 2021 ? '2021' : `2021 - ${year}`;
}

export function parseImage(path?: string): string {
  return new URL(path || '', IMAGE_SERVER_URL).href;
}

export interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

// interface Promise<T> {
//   asCancelable(): CancelablePromise<T>;
// }

export function asCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
  let cancel: (reason: {cancelled: boolean}) => void;
  const wrappedPromise = new Promise((resolve, reject) => {
    cancel = reject;
    Promise.resolve(promise).then(resolve).catch(reject);
  }) as any;
  wrappedPromise.cancel = () => {
    cancel({cancelled: true});
  };
  return wrappedPromise as CancelablePromise<T>;
}
