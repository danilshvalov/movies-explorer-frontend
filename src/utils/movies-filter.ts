/* ---------------------------------- Utils --------------------------------- */
import {SHORTS_FILMS_DURATION} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, MoviesList, SearchData} from '@types-src/types';
/* -------------------------------------------------------------------------- */

const wordPattern = /[a-zа-яё]+/gi;

function isShortFilm(duration: number): boolean {
  return duration < SHORTS_FILMS_DURATION;
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
        (nameRU
          && nameRU.toLocaleLowerCase().includes(val))
        || (nameEN && nameEN.toLocaleLowerCase().includes(val))
      );
    }) || false
  );
}

export function filterMoviesList(
  moviesList: MoviesList,
  searchData: SearchData,
): MoviesList {
  return moviesList.filter((movie) => moviesFilter(movie, searchData));
}
