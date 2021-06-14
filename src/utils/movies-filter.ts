import {IMovie, SearchData} from '../types/types';

const wordPattern = /[a-zа-яё]+/gi;

function isShortFilm(duration: number): boolean {
  return duration < 40;
}

export default function moviesFilter(
  {nameRU, nameEN, duration}: IMovie,
  {query, isChecked: isShortFilms}: SearchData,
): boolean {
  if (!isShortFilm(duration) && isShortFilms) {
    return false;
  }

  if (query === '') {
    return true;
  }

  const words = query.trim().match(wordPattern);

  return (
    words?.some((v) => {
      const val = v.toLocaleLowerCase();
      return (
        (nameRU && nameRU.toLocaleLowerCase().includes(val))
        || (nameEN && nameEN.toLocaleLowerCase().includes(val))
      );
    }) || false
  );
}
