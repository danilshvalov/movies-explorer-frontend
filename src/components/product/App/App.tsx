/* eslint-disable @typescript-eslint/no-unused-vars */
import {Route, Switch, useHistory} from 'react-router-dom';
import React from 'react';
import {createCn} from 'bem-react-classname';

import Login from '@product/Login/Login';
import Register from '@product/Register/Register';
import NotFound from '@generic/NotFound/NotFound';
import CurrentUserContext, {UserContextProps} from 'contexts/CurrentUserContext';
import {PAGE_LINKS} from '@utils/config';
import {LoginUserData, ProfileUserData, RegisterUserData} from 'types/User';
import {AuthorizeData, CurrentProfileData, UpdateProfileData} from 'types/Api';
import ProtectedRoute from '@generic/ProtectedRoute/ProtectedRoute';
import {IMovie, MoviesList, ReadablePromise} from 'types/types';
import MoviesPage from '@product/Movies/Movies';
import SavedMoviesPage from '@product/SavedMovies/SavedMovies';
import ProfilePage from '@product/Profile/Profile';
import MainPage from '@product/Main/Main';
import moviesApi from '@utils/api/MoviesApi';
import mainApi from '@utils/api/MainApi';

import './App.css';
import {errorParser, wrapPromise} from '@utils/utils';
import {useLocalStorage} from '@utils/hooks';
import {SearchData} from '@generic/SearchForm/SearchForm';
import moviesFilter from '@utils/movies-filter';

import Preloader from '@generic/Preloader/Preloader';

export function useSavedMovies() {
  const [value, setValue] = useLocalStorage<MoviesList>('saved-movies');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((movies) => setValue(movies))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const saveMovie = React.useCallback(
    (data: IMovie) => {
      mainApi
        .saveMovie(data)
        .then((movie) => setValue((old) => [...old!, movie]))
        .catch((err) => console.log(err));
    },
    [value, setValue],
  );

  const deleteMovie = React.useCallback(
    (data: IMovie) => {
      mainApi
        .deleteMovie(data._id!)
        .then((movie) => setValue((old) => old!.filter((val: IMovie) => {
          if (val._id && movie._id) {
            return val._id !== movie._id;
          }
          return false;
        })))
        .catch((err) => console.log(err));
    },
    [value, setValue],
  );

  const containsMovie = React.useCallback(
    (data: IMovie): boolean => {
      const isContains = value?.some((v) => v.movieId === data.movieId);
      // if undefined
      return isContains as boolean;
    },
    [value],
  );

  return {
    value,
    setValue,
    isLoading,
    containsMovie,
    saveMovie,
    deleteMovie,
    error,
  };
}

export function useAllMovies() {
  const [value, setValue] = React.useState<MoviesList>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    moviesApi
      .getMoviesList()
      .then((movies) => setValue(movies))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    value,
    setValue,
    isLoading,
    error,
  };
}

function AppDetail({user: userData}: {user: ReadablePromise<CurrentProfileData>}) {
  const cn = createCn('page');
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState<UserContextProps>({
    email: '',
    name: '',
    loggedIn: true,
    // FIXME убрать savedMovies
    savedMovies: [],
  });

  const rawUserData = userData.read();

  React.useEffect(() => {
    if (rawUserData.isOk) {
      setCurrentUser({...currentUser, ...rawUserData.data(), loggedIn: true});
    } else {
      setCurrentUser({...currentUser, loggedIn: false});
    }
  }, []);

  const [savedMoviesList, setSavedMoviesList] = useLocalStorage<MoviesList>('saved-movies');
  const [allMovies, setAllMovies] = React.useState<ReadablePromise<MoviesList>>();

  const getAllMovies = (): ReadablePromise<MoviesList> => {
    if (!allMovies) {
      console.log('all movies not defined');
      const movies = wrapPromise(moviesApi.getMoviesList());
      setAllMovies(movies);
      return movies;
    }
    return allMovies;
  };

  const getSavedMovies = React.useCallback((): ReadablePromise<MoviesList> => {
    if (!savedMoviesList) {
      console.log('saved movies not defined');
      const movies = wrapPromise(
        mainApi.getSavedMovies().then((list) => {
          setSavedMoviesList(list);
          return list;
        }),
      );
      return movies;
    }

    return wrapPromise(new Promise((resolve) => resolve(savedMoviesList)));
  }, [savedMoviesList, setSavedMoviesList]);

  React.useEffect(() => {
    console.log('fff', savedMoviesList);
  }, [savedMoviesList]);

  const searchFilms = (movies: MoviesList, settings: SearchData): MoviesList => {
    console.log('MOVIES IN SEARCH:', movies);
    console.log('settings:', settings);
    const res = movies.filter((movie) => moviesFilter(movie, settings));
    console.log('search: ', res);
    return res;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleMoviesSearch(settings: SearchData): MoviesList {
    // console.log()
    // searchFilms(moviesLists.moviesList, settings)
    return [];
  }
  const handleSavedMoviesSearch = (settings: SearchData) => searchFilms(savedMoviesList!, settings);

  function handleLogin(data: LoginUserData) {
    return mainApi.authorize(data).then(({name, email}: AuthorizeData) => {
      // TODO добавить savedMovies
      setCurrentUser({
        name,
        email,
        loggedIn: true,
        savedMovies: [],
      });
      history.push(PAGE_LINKS.main);
    });
  }

  function handleRegister(data: RegisterUserData) {
    // TODO что с data?
    console.log(data);
    return mainApi
      .register(data)
      .then(() => {
        history.push(PAGE_LINKS.signIn);
      })
      .catch(errorParser);
  }

  const handleLogout = () => {
    mainApi.logout().catch((err) => {
      console.log(err);
    });
  };

  const handleProfileUpdate = (data: ProfileUserData) => {
    console.log(data);
    return mainApi
      .updateUserInfo(data)
      .then(({email, name}: UpdateProfileData) => {
        setCurrentUser({
          ...currentUser,
          email,
          name,
        });
      })
      .catch(errorParser);
  };

  const handleSaveCard = (data: IMovie) => {
    mainApi
      .saveMovie(data)
      .then((movie) => {
        setSavedMoviesList([...savedMoviesList!, movie]);
      })
      .catch(errorParser);
  };
  const handleDeleteCard = (movie: IMovie) => {
    console.log('start deleting');
    const savedMovie = savedMoviesList!.find((el) => el.movieId === movie.movieId);

    if (savedMovie && savedMovie._id) {
      mainApi
        .deleteMovie(savedMovie._id)
        .then(({movieId}) => {
          setSavedMoviesList(savedMoviesList!.filter((el) => el.movieId !== movieId));
        })
        .catch(errorParser);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className={cn()}>
          <Switch>
            {/** ProtectedRoutes */}

            {/** Movies */}
            <ProtectedRoute path={PAGE_LINKS.movies}>
              <MoviesPage
                onSearch={handleMoviesSearch}
                // onSave={handleSaveCard}
                // onDelete={handleDeleteCard}
                allMovies={getAllMovies}
                savedMovies={getSavedMovies}
              />
            </ProtectedRoute>

            {/** SavedMovies */}
            <ProtectedRoute path={PAGE_LINKS.savedMovies}>
              <SavedMoviesPage onSearch={handleSavedMoviesSearch} onDelete={handleDeleteCard} />
            </ProtectedRoute>

            {/** Profile */}
            <ProtectedRoute path={PAGE_LINKS.profile}>
              <ProfilePage onProfileUpdate={handleProfileUpdate} onLogout={handleLogout} />
            </ProtectedRoute>

            {/** Routes */}
            {/** Main */}
            <Route exact path={PAGE_LINKS.main}>
              <MainPage />
            </Route>

            {/** Login */}
            <Route path={PAGE_LINKS.signIn}>
              <Login onLogin={handleLogin} />
            </Route>

            {/** Register */}
            <Route path={PAGE_LINKS.signUp}>
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </div>
    </CurrentUserContext.Provider>
  );
}

const App = () => {
  const [user, setUser] = React.useState(wrapPromise(mainApi.getUserInfo()));

  return (
    <React.Suspense fallback={<Preloader />}>
      <AppDetail user={user} />
    </React.Suspense>
  );
};

export default App;
