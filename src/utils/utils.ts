import {ParsedTime} from '../types/types';
import {IMAGE_SERVER_URL} from './config';
/**
 * Функция выравнивания количества
 *
 * Если шаг чётный или убрать мы не можем, то мы добавляем до границы
 *
 * Если шаг нечётный - убираем до границы
 * */
// REMOVE
/** @deprecated */
export function alignQuantity(currentCount: number, step: number): number {
  return step - (currentCount % step);
}

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

export const getCopyrightDate = () => {
  const year = new Date().getFullYear();
  return year === 2021 ? '2021' : `2021 - ${year}`;
};

export function parseImage(path?: string): string {
  return new URL(path || '', IMAGE_SERVER_URL).href;
}
