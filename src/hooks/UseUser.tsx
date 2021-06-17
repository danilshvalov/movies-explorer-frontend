import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
/* ---------------------------------- Utils --------------------------------- */
import mainApi from '@utils/api/MainApi';
import {DEFAULT_USER, PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {User, UserState} from '@types-src/user';
import {
  AuthorizedUserData,
  LoginUserData,
  ProfileUserData,
  RegisterUserData,
} from '@types-src/api';
/* -------------------------------------------------------------------------- */

export type OnAuthorizeFunc = () => void;

export interface Callbacks {
  onAuthorize?: OnAuthorizeFunc;
}

export function useUser(callbacks?: Callbacks): User {
  const [currentUser, setCurrentUser] = useState<UserState>({
    ...DEFAULT_USER,
    loggedIn: true,
    isLoading: true,
  });

  const history = useHistory();

  /* ----------------------------- State changers ----------------------------- */
  function authorizeUser({name, email}: AuthorizedUserData) {
    setCurrentUser((user) => ({
      ...user,
      email,
      name,
      loggedIn: true,
    }));
  }

  function updateUser({email, name}: ProfileUserData) {
    setCurrentUser({...currentUser, name, email});
  }

  function setUnAuthorizedUser() {
    setCurrentUser((user) => ({...user, loggedIn: false}));
  }

  function setLoadingEnd() {
    setCurrentUser((user) => ({
      ...user,
      isLoading: false,
    }));
  }

  /* -------------------------------- Handlers -------------------------------- */

  function handleSuccessAuthorizing(
    user: AuthorizedUserData,
  ): AuthorizedUserData {
    authorizeUser(user);
    history.push(PAGE_LINKS.movies);
    callbacks?.onAuthorize?.();
    return user;
  }

  function handleFailureAuthorizing(err: Error) {
    setUnAuthorizedUser();
    return Promise.reject(err);
  }

  function handleSuccessLogout() {
    setUnAuthorizedUser();
    history.push(PAGE_LINKS.main);
  }

  function handleSuccessProfileUpdate(data: ProfileUserData) {
    updateUser(data);
    return data;
  }

  /* -------------------------------- Internal -------------------------------- */
  function checkToken() {
    mainApi
      .checkToken()
      .then(authorizeUser)
      .catch(setUnAuthorizedUser)
      .finally(setLoadingEnd);
  }

  /* ---------------------------- Export functions ---------------------------- */

  function authorize(data: LoginUserData): Promise<AuthorizedUserData> {
    return mainApi
      .authorize(data)
      .then(handleSuccessAuthorizing)
      .catch(handleFailureAuthorizing)
      .finally(setLoadingEnd);
  }

  function register(data: RegisterUserData): Promise<AuthorizedUserData> {
    return mainApi
      .register(data)
      .then(() => authorize(data))
      .catch(handleFailureAuthorizing);
  }

  function updateUserInfo(data: ProfileUserData): Promise<ProfileUserData> {
    return mainApi.updateUserInfo(data).then(handleSuccessProfileUpdate);
  }

  function logout() {
    return mainApi.logout().then(handleSuccessLogout);
  }

  /* --------------------------------- Effects -------------------------------- */

  /** Проверка токена при монтировании */
  useEffect(() => {
    checkToken();
  }, []);

  /** Проверка токена при изменении страницы */
  useEffect(() => {
    checkToken();
  }, [history]);

  return {
    ...currentUser,
    authorize,
    register,
    updateUserInfo,
    logout,
  };
}

export default useUser;
