import Api from './Api';
import {BEATFILM_URL} from '../config';
import {
  HTTPMethod, Id, IMovie, MoviesList,
} from '../../types/types';
import {parseImage} from '../utils';

type MovieData = {
  id: number;
  nameRU: string;
  nameEN: string;
  director: string;
  country: string;
  year: string;
  duration: number;
  description: string;
  trailerLink: string;
  image?: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
};

function parseMovieData({
  id, image, trailerLink, ...data
}: MovieData): IMovie {
  return {
    movieId: id,
    thumbnail: parseImage(image?.formats.thumbnail.url),
    image: parseImage(image?.url),
    trailer: trailerLink,
    isSaved: false,
    ...data,
  };
}

/**
 * API для сервиса Beatfilm
 * @see Api
 * */
class MoviesApi extends Api {
  async getMoviesList(): Promise<MoviesList> {
    return this.sendRequest({
      path: '',
      method: HTTPMethod.Get,
    }).then((list) => list.map(parseMovieData));
  }

  // TODO nado???
  // REMOVE
  getMovie(id: Id): Promise<IMovie> {
    return this.sendRequest({
      path: `/${id}`,
      method: HTTPMethod.Get,
    }).then(parseMovieData);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BEATFILM_URL,
});

export default moviesApi;
