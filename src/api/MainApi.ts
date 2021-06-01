import {HTTPMethod, Id} from '../types/types';
import {backendUrl} from '../utils/config';
import Api from './Api';
import {LoginUserData, ProfileUserData, RegisterUserData} from '../types/User';
import {
  AuthorizeData,
  CurrentProfileData,
  MovieData,
  UpdateProfileData,
} from '../types/Api';

/**
 * API для собственного backend'a
 * @see Api
 * */
class MainApi extends Api {
  /** Авторизация пользователя */
  authorize(data: LoginUserData): Promise<AuthorizeData> {
    return this.sendRequest({
      path: 'signin',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Регистрация пользователя */
  register(data: RegisterUserData) {
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
  saveMovie(data: MovieData) {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Post,
      body: JSON.stringify(data),
    });
  }

  /** Удаление сохранённого фильма */
  deleteMovie(movieId: Id) {
    return this.sendRequest({
      path: `movies/${movieId}`,
      method: HTTPMethod.Delete,
    });
  }

  /** Получение всех сохраненных фильмов */
  getSavedMovies() {
    return this.sendRequest({
      path: 'movies',
      method: HTTPMethod.Get,
    });
  }

  /** Получение пользовательских данных */
  getUserInfo(): Promise<CurrentProfileData> {
    return this.sendRequest({path: 'users/me', method: HTTPMethod.Get});
  }

  /** Обновление пользовательских данных */
  updateUserInfo(data: ProfileUserData): Promise<UpdateProfileData> {
    return this.sendRequest({
      path: 'users/me',
      method: HTTPMethod.Patch,
      body: JSON.stringify(data),
    });
  }
}

const mainApi = new MainApi({
  baseUrl: backendUrl,
  defaultHeaders: new Headers({
    'Content-Type': 'application/json',
  }),
});

export default mainApi;
