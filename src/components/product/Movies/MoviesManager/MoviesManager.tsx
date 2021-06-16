import React, {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
import ErrorWrapper from '@generic/ErrorWrapper/ErrorWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useAllMovies from '@hooks/UseAllMovies';
import useSavedMovies from '@hooks/UseSavedMovies';
import useExpandableList from '@hooks/UseExpandableList';
/* ---------------------------------- Types --------------------------------- */
import {IMovie, SearchData} from 'types/types';
import {OnExternalErrorFunc} from 'types/functional';
/* ---------------------------------- Utils --------------------------------- */
import {filterMoviesList} from '@utils/movies-filter';
/* ---------------------------------- Local --------------------------------- */
import MoviesCardList from '@product/Movies/MoviesCardList/MoviesCardList';
import ErrorStub from '@product/Movies/ErrorStub/ErrorStub';
/* ---------------------------------- Utils --------------------------------- */
import {
  DEVICES_WIDTHS,
  MOVIES_AMOUNT_BY_DEVICE,
} from '@utils/config';
import getDeviceType from '@utils/device-type';
import {markSavedMovies} from '@utils/utils';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  searchData: SearchData;
  onExternalError: OnExternalErrorFunc;
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
function MoviesManager({
  searchData,
  onExternalError,
}: Props): JSX.Element {
  const {startCount, step} = MOVIES_AMOUNT_BY_DEVICE[getDeviceType(DEVICES_WIDTHS)];
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const allMovies = useAllMovies();
  const savedMovies = useSavedMovies();
  const filteredMovies = useExpandableList<IMovie>(
    {
      startCount,
      step,
      deviceSettings: DEVICES_WIDTHS,
      countSettings: MOVIES_AMOUNT_BY_DEVICE,
    },
    allMovies.value,
  );

  /* -------------------------------- Handlers -------------------------------- */

  function handleErrorSet() {
    setIsError(true);
  }

  function handleLoadMovies() {
    allMovies.loadOrRetry().catch(handleErrorSet);
    savedMovies.loadOrRetry().catch(handleErrorSet);
  }

  function handleReset() {
    handleLoadMovies();
    setIsError(false);
  }

  function handleSuccessSaving(movie: IMovie): IMovie {
    allMovies.addMovie(movie);
    return movie;
  }

  function handleSuccessDeleting(movie: IMovie): IMovie {
    allMovies.removeMovie(movie);
    return movie;
  }

  function handleSave(data: IMovie): Promise<IMovie> {
    return savedMovies
      .saveMovie(data)
      .then(handleSuccessSaving)
      .catch((err) => {
        onExternalError(err);
        /** Если что-то пошло не так - возвращаем старые данные */
        return data;
      });
  }

  function handleDelete(data: IMovie): Promise<IMovie> {
    return savedMovies
      .deleteMovie(data)
      .then(handleSuccessDeleting)
      .catch((err) => {
        onExternalError(err);
        /** Если что-то пошло не так - возвращаем старые данные */
        return data;
      });
  }

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    /** Первоначальная загрузка фильмов при монтировании */
    handleLoadMovies();
  }, []);

  useEffect(() => {
    setIsLoading(
      allMovies.isLoading || savedMovies.isLoading,
    );
  }, [allMovies.isLoading, savedMovies.isLoading]);

  useEffect(() => {
    function handleSearching() {
      if (allMovies.value && savedMovies.value) {
        filteredMovies.setValue(
          markSavedMovies(
            filterMoviesList(allMovies.value, searchData),
            savedMovies.value,
          ),
        );
      }
    }

    handleSearching();
  }, [searchData, allMovies.value, savedMovies.value]);

  /** Сброс ошибки при поиске */
  useEffect(() => {
    if (isError) {
      handleReset();
    }
  }, [searchData]);

  return (
    <PreloaderWrapper isLoading={isLoading}>
      <ErrorWrapper
        isError={isError}
        onReset={handleReset}
        fallback={ErrorStub}
      >
        <MoviesCardList
          onSave={handleSave}
          onDelete={handleDelete}
          moviesList={filteredMovies.value ?? []}
          isComplete={filteredMovies.isComplete}
          onExpand={filteredMovies.expand}
        />
      </ErrorWrapper>
    </PreloaderWrapper>
  );
}

export default MoviesManager;
