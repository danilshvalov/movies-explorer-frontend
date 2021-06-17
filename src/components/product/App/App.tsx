import {Route, Switch} from 'react-router-dom';
import {createCn} from 'bem-react-classname';
import React, {useState, useEffect} from 'react';
/* --------------------------------- Generic -------------------------------- */
import MessagePopup from '@generic/MessagePopup/MessagePopup';
import NotFound from '@generic/NotFound/NotFound';
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
/* --------------------------------- Product -------------------------------- */
import Login from '@product/Login/Login';
import Register from '@product/Register/Register';
import MoviesPage from '@product/Movies/Movies';
import SavedMoviesPage from '@product/SavedMovies/SavedMovies';
import ProfilePage from '@product/Profile/Profile';
import MainPage from '@product/Main/Main';
import AuthorizedRoute from '@product/AuthorizedRoute/AuthorizedRoute';
import UnAuthorizedRoute from '@product/UnAuthorizedRoute/UnAuthorizedRoute';
/* ---------------------------------- Utils --------------------------------- */
import {LOCAL_STORAGE_KEYS, PAGE_LINKS} from '@utils/config';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* ---------------------------------- Hooks --------------------------------- */
import useUser from '@hooks/UseUser';
import useMessagePopup from '@hooks/UseMessagePopup';
/* ---------------------------------- Types --------------------------------- */
import {LoginUserData, ProfileUserData, RegisterUserData} from '@types-src/api';
/* --------------------------------- Errors --------------------------------- */
import ApiError from '@errors/ApiError';
/* ---------------------------------- Texts --------------------------------- */
import INTERNAL_SERVER from '@texts/api';
/* -------------------------------------------------------------------------- */
import './App.css';

function App(): JSX.Element {
  const cn = createCn('page');

  const [isAppLoading, setIsAppLoading] = useState(true);

  const messagePopup = useMessagePopup();

  /* -------------------------------------------------------------------------- */

  function handleSuccessAuthorize() {
    /** Убираем фильмы предыдущего пользователя, если таковые имеются */
    localStorage.removeItem(LOCAL_STORAGE_KEYS.savedMovies);
  }

  const currentUser = useUser({onAuthorize: handleSuccessAuthorize});

  /* -------------------------------------------------------------------------- */

  function handleError(err: Error): void {
    if (err instanceof ApiError) {
      messagePopup.open(err.message);
    } else {
      messagePopup.open(INTERNAL_SERVER.message);
    }
  }

  function handleLogin(data: LoginUserData) {
    return currentUser.authorize(data);
  }

  function handleRegister(data: RegisterUserData) {
    return currentUser.register(data);
  }

  function handleLogout() {
    return currentUser.logout().catch(handleError);
  }

  function handleProfileUpdate(data: ProfileUserData) {
    return currentUser.updateUserInfo(data);
  }

  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    setIsAppLoading(currentUser.isLoading);
  }, [currentUser.isLoading]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PreloaderWrapper isLoading={isAppLoading} className={cn('preloader')}>
        <div className={cn()}>
          <Switch>
            {/** Movies */}
            <AuthorizedRoute path={PAGE_LINKS.movies}>
              <MoviesPage onExternalError={handleError} />
            </AuthorizedRoute>

            {/** SavedMovies */}
            <AuthorizedRoute path={PAGE_LINKS.savedMovies}>
              <SavedMoviesPage onExternalError={handleError} />
            </AuthorizedRoute>

            {/** Profile */}
            <AuthorizedRoute path={PAGE_LINKS.profile}>
              <ProfilePage
                onProfileUpdate={handleProfileUpdate}
                onLogout={handleLogout}
              />
            </AuthorizedRoute>

            {/** Main */}
            <Route exact path={PAGE_LINKS.main}>
              <MainPage />
            </Route>

            {/** Login */}
            <UnAuthorizedRoute path={PAGE_LINKS.signIn}>
              <Login onLogin={handleLogin} />
            </UnAuthorizedRoute>

            {/** Register */}
            <UnAuthorizedRoute path={PAGE_LINKS.signUp}>
              <Register onRegister={handleRegister} />
            </UnAuthorizedRoute>

            {/* 404 */}
            <Route path={PAGE_LINKS.notFound}>
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
