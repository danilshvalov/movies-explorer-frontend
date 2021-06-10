import {IMovie, SearchData} from '../types/types';

const wordPattern = /[a-zа-яё]+/gi;

export default function moviesFilter(
  {nameRU, nameEN, duration}: IMovie,
  {query, isChecked: isShortFilms}: SearchData,
): boolean {
  const words = query.trim().match(wordPattern);

  if ((isShortFilms && duration > 40) || (!isShortFilms && duration <= 40)) {
    return false;
  }

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
