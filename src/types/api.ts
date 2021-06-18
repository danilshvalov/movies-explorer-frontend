/** Данные зарегистрированного пользователя */
export interface RegisteredUser {
  _id: string;
  name: string;
  email: string;
}
/** Данные, необходимые для входа */
export interface LoginUserData {
  email: string;
  password: string;
}

/** Данные вошедшего пользователя */
export interface AuthorizedUserData {
  name: string;
  email: string;
}

/** Данные, необходимые для регистрации */
export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
}

/** Данные, возвращаемые пользователю */
export interface ProfileUserData {
  email: string;
  name: string;
}
