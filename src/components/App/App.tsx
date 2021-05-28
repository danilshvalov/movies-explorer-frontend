import {Route, Switch} from 'react-router';
import React from 'react';

import {createCn} from 'bem-react-classname';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageWrapper from '../PageWrapper/PageWrapper';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import {UserData as LoginUserData} from '../LoginForm/LoginForm';
import {UserData as RegisterUserData} from '../RegisterForm/RegisterForm';
import {UserData as ProfileUserData} from '../ProfileForm/ProfileForm';
import CurrentUserContext from '../../contexts/CurrentUserContexts';
import Profile from '../Profile/Profile';

import './App.css';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';
import moviesList from '../../utils/moviesDB';

const App = () => {
  const cn = createCn('page');
  const currentUser = React.useContext(CurrentUserContext);
  currentUser.isLoggedIn = true;
  currentUser.name = 'Виталий';

  const handleLogin = ({email}: LoginUserData) => {
    currentUser.email = email;
    currentUser.name = 'Тестовое имя';

    console.log(currentUser);
  };

  const handleRegister = (userData: RegisterUserData) => {
    /* do something */
    console.log(userData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleProfileUpdate = ({email, name}: ProfileUserData) => {
    currentUser.email = email;
    currentUser.name = name;
    console.log(currentUser);
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <PageWrapper>
            <Main />
          </PageWrapper>
        </Route>

        <Route path="/movies">
          <PageWrapper>
            <Movies moviesList={moviesList} />
          </PageWrapper>
        </Route>

        <Route path="/saved-movies">
          <PageWrapper>
            <SavedMovies
              moviesList={moviesList.filter(({isSaved}) => isSaved)}
            />
          </PageWrapper>
        </Route>

        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/profile">
          <div className={cn('profile')}>
            <Header />
            <Profile onProfileUpdate={handleProfileUpdate} />
          </div>
        </Route>

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
