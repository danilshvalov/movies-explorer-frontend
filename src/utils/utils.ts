import {MoviesList, ParsedTime} from 'types/types';
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

/**
 * Получает на вход все фильмы и сохраненные фильмы
 * Возвращает список всех фильмов, с помеченными сохраненными
 */
export function markSavedMovies(allMovies: MoviesList, savedMovies?: MoviesList): MoviesList {
  return allMovies.map((movie) => {
    if (savedMovies) {
      const same = savedMovies.find(
        (other) => movie.movieId === other.movieId,
      );
      return same
        ? {...movie, isSaved: true, _id: same._id}
        : {...movie, isSaved: false};
    }
    return {...movie, isSaved: false};
  });
}
