/* ---------------------------------- Types --------------------------------- */
import {HTTPMethod, IMovie, MoviesList} from '@types-src/types';
/* ---------------------------------- Utils --------------------------------- */
import Api from '@utils/api/Api';
import {BEATFILM_URL} from '@utils/config';
import {parseImage} from '@utils/utils';
/* -------------------------------------------------------------------------- */

export type MovieData = {
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

export function parseMovieData({
  image, trailerLink, id, ...data
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
  getMoviesList(): Promise<MoviesList> {
    return this.sendRequest({
      path: '',
      method: HTTPMethod.Get,
    }).then((list) => list.map(parseMovieData));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BEATFILM_URL,
});

export default moviesApi;
