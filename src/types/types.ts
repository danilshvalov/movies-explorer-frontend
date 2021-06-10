import {SearchData} from '@generic/SearchForm/SearchForm';

export enum Theme {
  Transparent = 'transparent',
  Azure = 'azure',
  Snow = 'snow',
  Ghost = 'ghost',
  Light = 'light',
}

export type Id = string;

export interface IMovie {
  _id?: string;
  movieId: number;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailer: string;
  nameRU: string;
  nameEN: string;
  thumbnail: string;
  isSaved: boolean;
}

export interface WithMoviesList {
  moviesList: MoviesList;
}

export type OnSearchFunc = (data: SearchData) => any;
export type SearchWithMoviesFunc = (data: SearchData) => MoviesList;

export interface WithError {
  isError?: boolean;
}

export interface WithTheme {
  theme?: Theme;
}

export interface WithApiInteraction {
  APIError: string;
  isProcessing: boolean;
}

export type ApiCallback<T> = (data: T) => Promise<void | string>;

export interface ILink {
  name: string;
  path: string;
}

export type MoviesList = IMovie[];
export type LinkList = ILink[];

export enum DeviceType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Phone = 'phone',
}

export enum ButtonTypes {
  Save,
  Delete,
}

export interface DeviceWidthSettings {
  desktop: number | string;
  tablet: number | string;
  phone: number | string;
}

export interface AmountSettings {
  startCount: number;
  step: number;
}

export interface AmountDeviceSettings {
  desktop: AmountSettings;
  tablet: AmountSettings;
  phone: AmountSettings;
}

export interface ParsedTime {
  hours?: number;
  minutes: number;
}

export enum HTTPMethod {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export type ReadFunc<T> = () => {data(): T; isOk: boolean};

export type ReadablePromise<T> = {
  read: ReadFunc<T>;
};

export interface LoginUserData {
  email: string;
  password: string;
}

export type OnLoginFunc = ApiCallback<LoginUserData>;
