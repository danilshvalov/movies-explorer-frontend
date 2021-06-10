import {Id, IMovie} from './types';

/**
 * @see MoviesCard
 * */
export interface IMoviesCard {
  movieId: Id;
  duration: number;
  thumbnail: any;
  nameRU: string;
  isSaved: boolean;
}

/**
 * Вызываемая функция при сохранении [кнопки]{@link SaveButton}
 * @see MoviesCardWithSaving
 * */
/** @deprecated */
// REMOVE
export type OnSaveFunc = (data: IMovie) => any;

/**
 * callback функция, вызываемая при нажатии [кнопки]{@link DeleteButton}
 * @see MoviesCardWithDeleting
 */
/** @deprecated */
// REMOVE
export type OnDeleteFunc = (data: IMovie) => any;
