import {Route, Switch} from 'react-router-dom';
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

import './App.css';

const App = () => {
  const cn = createCn('page');
  const [currentUser, setCurrentUser] = React.useState<UserContextProps>({
    email: '',
    name: 'Виталий',
    isLoggedIn: true,
    savedMovies: [],
  });

  const handleLogin = ({email, password}: LoginUserData) => {
    setCurrentUser({...currentUser, email});
    // FEATURE добавить логику
    // eslint-disable-next-line no-console
    console.log(`Login | email: ${email} password: ${password}`);
  };

  const handleRegister = ({email, name, password}: RegisterUserData) => {
    // FEATURE добавить логику
    // eslint-disable-next-line no-console
    console.log(
      `Register | email: ${email} password: ${password} name: ${name}`,
    );
  };

  const handleProfileUpdate = ({email, name}: ProfileUserData) => {
    setCurrentUser({
      ...currentUser, isLoggedIn: true, email, name,
    });
    // FEATURE добавить логику
    // eslint-disable-next-line no-console
    console.log(`ProfileUpdate | email: ${email} name: ${name}`);
  };

  const handleSaveCard = ({isSaved, id}: SaveData) => {
    // FEATURE добавить логику
    // eslint-disable-next-line no-console
    console.log(`SaveCard | id: ${id} isSaved: ${isSaved}`);
  };
  const handleDeleteCard = ({id}: DeleteData) => {
    // FEATURE добавить логику
    // eslint-disable-next-line no-console
    console.log(`DeleteCard | id: ${id}`);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={cn()}>
        <Switch>
          <Route exact path={pageLinks.main}>
            <PageWrapper>
              <Main />
            </PageWrapper>
          </Route>

          <Route path={pageLinks.movies}>
            <PageWrapper>
              <Movies onSave={handleSaveCard} moviesList={moviesList} />
            </PageWrapper>
          </Route>

          <Route path={pageLinks.savedMovies}>
            <PageWrapper>
              <SavedMovies
                onDelete={handleDeleteCard}
                moviesList={moviesList.filter(({isSaved}) => isSaved)}
              />
            </PageWrapper>
          </Route>

          <Route path={pageLinks.signIn}>
            <Login onLogin={handleLogin} />
          </Route>

          <Route path={pageLinks.signUp}>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path={pageLinks.profile}>
            <Header />
            <Profile onProfileUpdate={handleProfileUpdate} />
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
