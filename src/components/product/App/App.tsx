import {Route, Switch} from 'react-router-dom';
import {createCn} from 'bem-react-classname';
import React, {useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import MessagePopup from '@generic/MessagePopup/MessagePopup';
import ProtectedRoute from '@generic/ProtectedRoute/ProtectedRoute';
import NotFound from '@generic/NotFound/NotFound';
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* --------------------------------- Product -------------------------------- */
import Login from '@product/Login/Login';
import Register from '@product/Register/Register';
import MoviesPage from '@product/Movies/Movies';
import SavedMoviesPage from '@product/SavedMovies/SavedMovies';
import ProfilePage from '@product/Profile/Profile';
import MainPage from '@product/Main/Main';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* ---------------------------------- Hooks --------------------------------- */
import useUser from '@hooks/UseUser';
import useMessagePopup from '@hooks/UseMessagePopup';
/* ---------------------------------- Types --------------------------------- */
import {LoginUserData} from 'types/types';
import {ProfileUserData, RegisterUserData} from 'types/User';
/* -------------------------------------------------------------------------- */
import './App.css';

function App(): JSX.Element {
  const cn = createCn('page');

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAppLoading, setIsAppLoading] = useState(false);

  const messagePopup = useMessagePopup();

  const currentUser = useUser();

  function handleLogin(data: LoginUserData) {
    return currentUser.authorize(data);
  }

  function handleRegister(data: RegisterUserData) {
    return currentUser.register(data);
  }

  const handleLogout = () => {
    currentUser.logout();
  };

  function handleProfileUpdate(data: ProfileUserData) {
    return currentUser.updateUserInfo(data);
  }

  function handleErrorMessage(msg: string) {
    messagePopup.open(msg);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PreloaderWrapper isLoading={isAppLoading}>
        <div className={cn()}>
          <Switch>
            {/** ProtectedRoutes */}

            {/** Movies */}
            <ProtectedRoute path={PAGE_LINKS.movies}>
              <MoviesPage onErrorMessage={handleErrorMessage} />
            </ProtectedRoute>

            {/** SavedMovies */}
            <ProtectedRoute path={PAGE_LINKS.savedMovies}>
              <SavedMoviesPage onErrorMessage={handleErrorMessage} />
            </ProtectedRoute>

            {/** Profile */}
            <ProtectedRoute path={PAGE_LINKS.profile}>
              <ProfilePage
                onProfileUpdate={handleProfileUpdate}
                onLogout={handleLogout}
              />
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

          <MessagePopup
            isOpen={messagePopup.isOpen}
            message={messagePopup.message}
            onClose={messagePopup.close}
          />
        </div>
      </PreloaderWrapper>
    </CurrentUserContext.Provider>
  );
}

export default App;
