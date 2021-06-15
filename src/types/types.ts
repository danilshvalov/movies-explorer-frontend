import {RegisterUserData, ProfileUserData} from './User';

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

/* ---------------------------------- With ---------------------------------- */
export interface WithMoviesList {
  moviesList: MoviesList;
}

export interface WithError<T = unknown> {
  error?: T;
  isError?: boolean;
}

export interface WithTheme {
  theme?: Theme;
}

export interface WithLoading {
  isLoading?: boolean;
}
/* -------------------------------------------------------------------------- */

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

/* ---------------------------------- User ---------------------------------- */
export interface UserActions {
  authorize: OnLoginFunc;
  register: OnRegisterFunc;
  updateUserInfo: OnProfileUpdateFunc;
  logout: OnLogoutFunc;
}

export interface UserState {
  name: string;
  email: string;
  loggedIn: boolean;
  isLoading: boolean;
}

export type User = UserActions & UserState;
/* -------------------------------- DataTypes ------------------------------- */
export interface RegisteredUser {
  _id: string;
  name: string;
  email: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface AuthorizedUserData {
  name: string;
  email: string;
}

export interface SearchData {
  isChecked: boolean;
  query: string;
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
export type OnErrorFunc = (err: Error) => any;
export type OnErrorMessageFunc = (msg: string) => void;
/* -------------------------------------------------------------------------- */
