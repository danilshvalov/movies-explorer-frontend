import {Route, Switch, useHistory} from 'react-router-dom';
import React from 'react';
import {createCn} from 'bem-react-classname';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageWrapper from '../PageWrapper/PageWrapper';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext, {
  UserContextProps,
} from '../../contexts/CurrentUserContext';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import moviesList from '../../utils/moviesDB';
import {SaveData} from '../SaveButtonWrapper/SaveButtonWrapper';
import {DeleteData} from '../DeleteButtonWrapper/DeleteButtonWrapper';
import {pageLinks} from '../../utils/config';
import {
  LoginUserData,
  ProfileUserData,
  RegisterUserData,
} from '../../types/User';

import moviesApi from '../../api/MoviesApi';
import mainApi from '../../api/MainApi';

import './App.css';
import {AuthorizeData, UpdateProfileData} from '../../types/Api';
import {SaveCardData} from '../../types/Movie';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const cn = createCn('page');
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState<UserContextProps>({
    email: '',
    name: 'Виталий',
    isLoggedIn: true,
    savedMovies: [],
  });

  const handleLogin = (data: LoginUserData) => {
    console.log(data);
    mainApi.authorize(data).then(({name, email}: AuthorizeData) => {
      // TODO добавить savedMovies
      setCurrentUser({
        name,
        email,
        isLoggedIn: true,
        savedMovies: [],
      });
      history.push(pageLinks.main);
    });
  };
  const handleRegister = (data: RegisterUserData) => {
    // TODO что с data?
    console.log(data);
    mainApi.register(data).then(() => {
      history.push(pageLinks.signIn);
    });
  };
  const handleLogout = () => mainApi.logout();

  const handleProfileUpdate = (data: ProfileUserData) => {
    console.log(data);
    mainApi.updateUserInfo(data).then(({email, name}: UpdateProfileData) => {
      setCurrentUser({
        ...currentUser,
        email,
        name,
      });
    });
  };

  const handleSaveCard = ({isSaved, movieId, ...cardData}: SaveCardData) => {
    if (isSaved) {
      // TODO then?
      mainApi.saveMovie({movieId, ...cardData});
    } else {
      // TODO then?
      mainApi.deleteMovie(movieId);
    }
  };
  const handleDeleteCard = ({id}: DeleteData) => {
    // TODO then?
    mainApi.deleteMovie(id);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={cn()}>
        <Switch>
          {/** ProtectedRoutes */}

          {/** Movies */}
          <ProtectedRoute path={pageLinks.movies}>
            <PageWrapper>
              <Movies onSave={handleSaveCard} moviesList={moviesList} />
            </PageWrapper>
          </ProtectedRoute>

          {/** SavedMovies */}
          <ProtectedRoute path={pageLinks.savedMovies}>
            <PageWrapper>
              <SavedMovies
                onDelete={handleDeleteCard}
                moviesList={moviesList.filter(({isSaved}) => isSaved)}
              />
            </PageWrapper>
          </ProtectedRoute>

          {/** Profile */}
          <ProtectedRoute path={pageLinks.profile}>
            <Header />
            <Profile onProfileUpdate={handleProfileUpdate} />
          </ProtectedRoute>

          {/** Routes */}
          {/** Main */}
          <Route exact path={pageLinks.main}>
            <PageWrapper>
              <Main />
            </PageWrapper>
          </Route>

          {/** Login */}
          <Route path={pageLinks.signIn}>
            <Login onLogin={handleLogin} />
          </Route>

          {/** Register */}
          <Route path={pageLinks.signUp}>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
