import {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useAllMovies from '@hooks/UseAllMovies';
import useSavedMovies from '@hooks/UseSavedMovies';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, SearchData} from 'types/types';
/* ---------------------------------- Utils --------------------------------- */
import moviesFilter from '@utils/movies-filter';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/Movies/MoviesCardList/MoviesCardList';
import ErrorStub from '@product/Movies/ErrorStub/ErrorStub';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';
import useExpandableList from '@hooks/UseExpandableList';
import {DEVICES_WIDTHS, MOVIES_AMOUNT_BY_DEVICE} from '@utils/config';
import getDeviceType from '@utils/device-type';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData: SearchData;
}
export type Props = FunctionalProps;

/**
 * Компонент, управляющий фильмами
 *
 * Получает списки фильмов с помощью хуков
 * Фильтрует фильмы по заданному запросу
 * Пустой запрос считается некорректным
 *
 * @see useAllMovies
 * @see useSavedMovies
 * */
function MoviesManager({searchData}: Props): JSX.Element {
  const {startCount} = MOVIES_AMOUNT_BY_DEVICE[getDeviceType(DEVICES_WIDTHS)];

  const [isError, setIsError] = useState(false);
  const handleErrorReset = () => setIsError(false);
  const handleErrorSet = () => setIsError(true);

  const [isLoading, setIsLoading] = useState(true);
  const allMovies = useAllMovies();
  const savedMovies = useSavedMovies(handleErrorSet);
  const filteredMovies = useExpandableList<IMovie>(
    {
      startCount,
      deviceSettings: DEVICES_WIDTHS,
      countSettings: MOVIES_AMOUNT_BY_DEVICE,
    },
    allMovies.value,
  );

  function handleSave(data: IMovie): Promise<IMovie> {
    return savedMovies.saveMovie(data).then((movie) => {
      allMovies.setValue((old) => old?.map((val) => (val.movieId === data.movieId //
        ? {...movie, isSaved: true}
        : val)));
      return movie;
    });
  }

  function handleDelete(data: IMovie): Promise<IMovie> {
    return savedMovies.deleteMovie(data).then(() => {
      allMovies.setValue((old) => old?.map((val) => (val.movieId === data.movieId //
        ? {...data, isSaved: false} : val)));
      return data;
    });
  }

  useEffect(() => {
    setIsLoading(allMovies.isLoading || savedMovies.isLoading);
  }, [allMovies.isLoading, savedMovies.isLoading]);

  useEffect(() => {
    if (allMovies.value && savedMovies.value) {
      filteredMovies.setValue(
        allMovies.value
          .filter((movie) => moviesFilter(movie, searchData))
          .map((movie) => {
            if (savedMovies.value) {
              const same = savedMovies.value.find(
                (other) => movie.movieId === other.movieId,
              );
              return same
                ? {...movie, isSaved: true, _id: same._id}
                : {...movie, isSaved: false};
            }
            return {...movie, isSaved: false};
          }),
      );
    }
  }, [searchData, allMovies.value, savedMovies.value]);

  return (
    <PreloaderWrapper isLoading={isLoading}>
      <ErrorWrapper
        isError={isError}
        onReset={handleErrorReset}
        fallback={ErrorStub}
      >
        <MoviesCardList
          onSave={handleSave}
          onDelete={handleDelete}
          /** Preloader не даст загрузиться несуществующему списку */
          moviesList={filteredMovies.value || []}
          isComplete={filteredMovies.isComplete}
          onExpand={filteredMovies.expand}
        />
      </ErrorWrapper>
    </PreloaderWrapper>
  );
}

export default MoviesManager;
