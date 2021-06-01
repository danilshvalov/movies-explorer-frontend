import {Id} from './types';

export interface AuthorizeData {
  name: string;
  email: string;
}

export interface UpdateProfileData {
  name: string;
  email: string;
}

export interface CurrentProfileData {
  name: string;
  email: string;
}

export interface MovieData {
  movieId: Id;
  duration: number;
  thumbnail: any;
  nameRU: string;
}
