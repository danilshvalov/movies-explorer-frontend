import {createCn} from 'bem-react-classname';
import React from 'react';

import {Link} from 'react-router-dom';
import {login as texts} from '@utils/texts';
import {PAGE_LINKS} from '@utils/config';
import ColoredLink from '@/ColoredLink/ColoredLink';
import LoginForm, {LoginFunc} from '@/LoginForm';
import Logo from '@/Logo';

import './Login.css';

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback, вызываемый при отправке формы */
  onLogin: LoginFunc;
}

/**
 * Секция с логином
 * @see LoginForm
 * */
const Login = ({className, onLogin, ...props}: LoginProps) => {
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
        <Link component={ColoredLink} to={PAGE_LINKS.signUp} className={cn('link')}>
          {texts.subtext.link}
        </Link>
      </span>
    </div>
  );
};

export default Login;
