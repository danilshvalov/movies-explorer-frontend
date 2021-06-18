export enum Theme {
  Transparent = 'transparent',
  Azure = 'azure',
  Snow = 'snow',
  Ghost = 'ghost',
  Light = 'light',
}
export enum ButtonTypes {
  Save,
  Delete,
}

/* -------------------------------------------------------------------------- */

export type Id = string;

export interface IMovie {
  _id?: Id;
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
export type MoviesList = IMovie[];

export interface ILink {
  name: string;
  path: string;
}
export type LinkList = ILink[];

export enum DeviceType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Phone = 'phone',
}

/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */

export interface ParsedTime {
  hours?: number;
  minutes: number;
}

/* -------------------------------------------------------------------------- */

export enum HTTPMethod {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

/* -------------------------------------------------------------------------- */

export interface SearchData {
  isChecked: boolean;
  query: string;
}
