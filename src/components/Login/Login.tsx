import {createCn} from 'bem-react-classname';
import React from 'react';

import {Link} from 'react-router-dom';
import {login as texts} from '../../utils/texts';
import {pageLinks} from '../../utils/config';
import ColoredLink from '../ColoredLink/ColoredLink';
import LoginForm, {LoginFunc} from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';

import './Login.css';

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback, вызываемый при отправке формы */
  onLogin: LoginFunc;
}

/** Секция с логином */
const Login: React.FC<LoginProps> = ({onLogin, className, ...props}) => {
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
        <Link
          component={ColoredLink}
          to={pageLinks.signUp}
          className={cn('link')}
        >
          {texts.subtext.link}
        </Link>
      </span>
    </div>
  );
};

export default Login;
