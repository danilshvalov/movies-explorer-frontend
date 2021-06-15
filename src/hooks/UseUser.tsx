import mainApi from '@utils/api/MainApi';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {UpdateProfileData} from 'types/Api';
import {
  AuthorizedUserData, LoginUserData, User, UserState,
} from 'types/types';
import {ProfileUserData, RegisterUserData} from 'types/User';

export function useUser(): User {
  const [currentUser, setCurrentUser] = useState<UserState>({
    name: 'Пользователь',
    email: 'email@mail.com',
    loggedIn: true,
    isLoading: true,
  });

  useEffect(() => {
    mainApi
      .checkToken()
      .then(({name, email}) => {
        setCurrentUser((user) => ({
          ...user, name, email, loggedIn: true,
        }));
      })
      .catch(() => setCurrentUser((user) => ({...user, loggedIn: false})))
      .finally(() => setCurrentUser((user) => ({...user, isLoading: false})));
  }, []);

  function authorize(data: LoginUserData): Promise<AuthorizedUserData> {
    return mainApi
      .authorize(data)
      .then(({email, name}) => {
        setCurrentUser((user) => ({
          ...user, email, name, loggedIn: true,
        }));
        return {email, name};
      })
      .catch((err) => {
        setCurrentUser((user) => ({...user, loggedIn: false}));
        return Promise.reject(err);
      });
  }

  function register(data: RegisterUserData): Promise<RegisterUserData> {
    return mainApi.register(data);
  }

  function updateUserInfo(data: ProfileUserData): Promise<UpdateProfileData> {
    return mainApi.updateUserInfo(data).then(({name, email}) => {
      setCurrentUser({...currentUser, name, email});
      return {name, email};
    });
  }

  function logout() {
    return mainApi.logout();
  }

  const history = useHistory();

  useEffect(() => {
    mainApi
      .checkToken()
      .then(({name, email}) => setCurrentUser((user) => ({
        ...user, name, email, loggedIn: true,
      })))
      .catch(() => setCurrentUser({...currentUser, loggedIn: false}));
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
