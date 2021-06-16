/* ---------------------------------- Types --------------------------------- */
import {
  ProfileUserData,
  RegisterUserData,
  AuthorizedUserData,
  LoginUserData,
} from 'types/api';
import {
  HTTPMethod, Id, IMovie, MoviesList,
} from 'types/types';

/* ---------------------------------- Utils --------------------------------- */
import {BACKEND_URL} from '@utils/config';
/* ----------------------------------- Api ---------------------------------- */
import Api from './Api';
/* -------------------------------------------------------------------------- */

/**
 * API для собственного backend'a
 * @see Api
 * */
class MainApi extends Api {
  /** Авторизация пользователя */
  authorize(data: LoginUserData): Promise<AuthorizedUserData> {
    return this.sendRequest({
      path: 'signin',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  checkToken(): Promise<AuthorizedUserData> {
    return this.sendRequest({
      path: 'users/me',
      method: HTTPMethod.Get,
    });
  }

  /** Регистрация пользователя */
  register(data: RegisterUserData): Promise<RegisterUserData> {
    return this.sendRequest({
      path: 'signup',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Выход из аккаунта */
  logout() {
    return this.sendRequest({
      path: 'signout',
      method: HTTPMethod.Post,
    });
  }

  /** Сохранение фильма */
  saveMovie(data: IMovie): Promise<IMovie> {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Удаление сохранённого фильма */
  deleteMovie(movieId: Id): Promise<IMovie> {
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
  getUserInfo(): Promise<ProfileUserData> {
    return this.sendRequest({
      path: 'users/me',
      method: HTTPMethod.Get,
    });
  }

  /** Обновление пользовательских данных */
  updateUserInfo(data: ProfileUserData): Promise<ProfileUserData> {
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
