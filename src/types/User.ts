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
