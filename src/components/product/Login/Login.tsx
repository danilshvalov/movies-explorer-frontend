import {createCn} from 'bem-react-classname';
import {Link} from 'react-router-dom';
/* -------------------------------- Generics -------------------------------- */
import {Link as GenericLink} from '@generic/Link/Link';
import Logo from '@generic/Logo/Logo';
/* ---------------------------------- Utils --------------------------------- */
import {login as texts} from '@utils/texts';
import {PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {OnLoginFunc} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import LoginForm from '@product/Login/LoginForm/LoginForm';
/* -------------------------------------------------------------------------- */
import './Login.css';

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback, вызываемый при отправке формы */
  onLogin: OnLoginFunc;
}

/**
 * Секция с логином
 * @see LoginForm
 * */
export function Login({className, onLogin, ...props}: LoginProps): JSX.Element {
  const cn = createCn('login', className);
  return (
    <div {...props} className={cn()}>
      {/** Логотип сайта */}
      <Logo className={cn('logo')} />
      {/** Заголовок секции */}
      <h1 className={cn('title')}>{texts.title}</h1>
      {/** Форма входа */}
      <LoginForm className={cn('form')} onLogin={onLogin} />
      {/** Перенаправляющий зарегистрированных пользователей текст */}
      <span className={cn('sub-text')}>
        {texts.subtext.text}
        <Link component={GenericLink} to={PAGE_LINKS.signUp} className={cn('link')}>
          {texts.subtext.link}
        </Link>
      </span>
    </div>
  );
}

export default Login;
