import {ParsedTime} from './types';

/**
 * Функция выравнивания количества
 *
 * Если шаг чётный или убрать мы не можем, то мы добавляем до границы
 *
 * Если шаг нечётный - убираем до границы
 * */
export const alignQuantity = (currentCount: number, step: number): number => {
  if (currentCount % step === 0) {
    return currentCount;
  }

  if (currentCount < step || step % 2 === 0) {
    return currentCount + step - (currentCount % step);
  }

  return currentCount - (currentCount % step);
};

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
