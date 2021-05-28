export enum Theme {
  Transparent = 'transparent',
  Azure = 'azure',
  Snow = 'snow',
  Ghost = 'ghost',
  Light = 'light',
}

export interface IMovie {
  movieId: number;
  duration: number;
  thumbnail: any;
  nameRU: string;
}

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
