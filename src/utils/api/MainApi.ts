import {ProfileUserData, RegisterUserData} from 'types/User';
import {
  HTTPMethod, Id, IMovie, LoginUserData, MoviesList,
} from '../../types/types';

import {BACKEND_URL} from '../config';
import Api from './Api';
import {CurrentProfileData, UpdateProfileData} from '../../types/Api';

export interface MovieData {
  _id: string;
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
}

/**
 * API для собственного backend'a
 * @see Api
 * */
class MainApi extends Api {
  /** Авторизация пользователя */
  authorize(data: LoginUserData) {
    return this.sendRequest({
      path: 'signin',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  checkToken() {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Get,
    }).then((res) => res.ok);
  }

  /** Регистрация пользователя */
  async register(data: RegisterUserData) {
    return this.sendRequest({
      path: 'signup',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Выход из аккаунта */
  async logout() {
    return this.sendRequest({
      path: 'signout',
      method: HTTPMethod.Post,
    });
  }

  /** Сохранение фильма */
  async saveMovie(data: IMovie): Promise<IMovie> {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Удаление сохранённого фильма */
  async deleteMovie(movieId: Id): Promise<IMovie> {
    return this.sendRequest({
      path: `movies/${movieId}`,
      method: HTTPMethod.Delete,
    });
  }

  /** Получение всех сохраненных фильмов */
  getSavedMovies(): Promise<MoviesList> {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Get,
    });
  }

  /** Получение пользовательских данных */
  async getUserInfo(): Promise<CurrentProfileData> {
    return this.sendRequest({
      path: 'users/me',
      method: HTTPMethod.Get,
    });
  }

  /** Обновление пользовательских данных */
  async updateUserInfo(data: ProfileUserData): Promise<UpdateProfileData> {
    return this.sendRequest({
      path: 'users/me',
      method: HTTPMethod.Patch,
      body: JSON.stringify(data),
    });
  }
}

const mainApi = new MainApi({
  baseUrl: BACKEND_URL,
  defaultHeaders: new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  }),
  settings: {
    credentials: 'include',
  },
});

export default mainApi;
