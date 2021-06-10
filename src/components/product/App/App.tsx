import {Route, Switch, useHistory} from 'react-router-dom';
import {createCn} from 'bem-react-classname';
import {useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
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
import mainApi from '@utils/api/MainApi';
import {PAGE_LINKS} from '@utils/config';
import {errorParser} from '@utils/utils';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext, {UserContextProps} from '@contexts/CurrentUserContext';
/* ---------------------------------- Types --------------------------------- */
import {LoginUserData} from 'types/types';
import {ProfileUserData, RegisterUserData} from 'types/User';
import {AuthorizeData, UpdateProfileData} from 'types/Api';
/* -------------------------------------------------------------------------- */
import './App.css';

function App(): JSX.Element {
  const cn = createCn('page');
  const history = useHistory();

  const [isAppLoading, setIsAppLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<UserContextProps>({
    email: '',
    name: '',
    loggedIn: true,
  });

  useEffect(() => {
    function checkJWT() {
      mainApi
        .getUserInfo()
        .then(({name, email}) => setCurrentUser({name, email, loggedIn: true}))
        .catch(() => setCurrentUser((prev) => ({...prev, loggedIn: false})))
        .finally(() => setIsAppLoading(false));
    }

    checkJWT();
  }, [history]);

  function handleLogin(data: LoginUserData) {
    return mainApi.authorize(data).then(({name, email}: AuthorizeData) => {
      // TODO добавить savedMovies
      setCurrentUser({
        name,
        email,
        loggedIn: true,
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PreloaderWrapper isLoading={isAppLoading}>
        <div className={cn()}>
          <Switch>
            {/** ProtectedRoutes */}

            {/** Movies */}
            <ProtectedRoute path={PAGE_LINKS.movies}>
              <MoviesPage />
            </ProtectedRoute>

            {/** SavedMovies */}
            <ProtectedRoute path={PAGE_LINKS.savedMovies}>
              <SavedMoviesPage />
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
      </PreloaderWrapper>
    </CurrentUserContext.Provider>
  );
}

export default App;
