/** Данные, необходимые для регистрации */
export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
}

/** Данные, необходимые для авторизации */
export interface LoginUserData {
  email: string;
  password: string;
}

/** Данные, возвращаемые пользователю */
export interface ProfileUserData {
  email: string;
  name: string;
}
