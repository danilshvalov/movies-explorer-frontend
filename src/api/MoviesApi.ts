import Api from './Api';
import {beatFilmUrl} from '../utils/config';
import {HTTPMethod} from '../types/types';

/**
 * API для сервиса Beatfilm
 * @see Api
 * */
class MoviesApi extends Api {
  getMoviesList() {
    return this.sendRequest({path: '', method: HTTPMethod.Post});
  }
}

const moviesApi = new MoviesApi({baseUrl: beatFilmUrl});

export default moviesApi;
