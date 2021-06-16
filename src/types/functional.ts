import {MoviesList, SearchData, Theme} from 'types/types';
import {
  AuthorizedUserData,
  LoginUserData,
  ProfileUserData,
  RegisterUserData,
} from 'types/api';

/* ---------------------------------- With ---------------------------------- */
export interface WithMoviesList {
  moviesList: MoviesList;
}

export interface WithError<T = Error> {
  error?: T;
  isError?: boolean;
}

export interface WithTheme {
  theme?: Theme;
}

export interface WithLoading {
  isLoading?: boolean;
}

/* -------------------------------- FuncTypes ------------------------------- */
export type ApiCallback<T, U = T> = (data: T) => Promise<U>;
export type OnLoginFunc = ApiCallback<LoginUserData, AuthorizedUserData>;
export type OnRegisterFunc = ApiCallback<RegisterUserData, AuthorizedUserData>;
export type OnProfileUpdateFunc = ApiCallback<ProfileUserData>;
export type OnLogoutFunc = () => Promise<void>;
export type OnSaveFunc<T, U = T> = ApiCallback<T, U>;
export type OnSearchFunc<T> = (data: SearchData) => T;
export type OnDeleteFunc<T, U = T> = ApiCallback<T, U>;
export type OnExternalErrorFunc = (err: Error) => void;
/* -------------------------------------------------------------------------- */
