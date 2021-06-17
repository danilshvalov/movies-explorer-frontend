import {
  OnLoginFunc,
  OnLogoutFunc,
  OnProfileUpdateFunc,
  OnRegisterFunc,
} from '@types-src/functional';

export interface UserActions {
  authorize: OnLoginFunc;
  register: OnRegisterFunc;
  updateUserInfo: OnProfileUpdateFunc;
  logout: OnLogoutFunc;
}

export interface UserState {
  name: string;
  email: string;
  loggedIn: boolean;
  isLoading: boolean;
}

export type User = UserActions & UserState;
