import {createCn} from 'bem-react-classname';
import {Link} from 'react-router-dom';
import React, {HTMLAttributes} from 'react';
/* -------------------------------- Generics -------------------------------- */
import {Link as GenericLink} from '@generic/Link/Link';
import Logo from '@generic/Logo/Logo';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Texts --------------------------------- */
import {LOGIN as TEXTS} from '@texts/product';
/* ---------------------------------- Types --------------------------------- */
import {OnLoginFunc} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import LoginForm from '@product/Login/LoginForm/LoginForm';
/* -------------------------------------------------------------------------- */
import './Login.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps {
  /** callback, вызываемый при отправке формы */
  onLogin: OnLoginFunc;
}
export type Props = DOMProps & FunctionalProps;

/**
 * Секция с логином
 * @see {@link LoginForm}
 * */
export function Login({
  className,
  onLogin,
  ...props
}: Props): JSX.Element {
  const cn = createCn('login', className);
  return (
    <div {...props} className={cn()}>
      {/** Логотип сайта */}
      <Logo className={cn('logo')} />
      {/** Заголовок секции */}
      <h1 className={cn('title')}>{TEXTS.title}</h1>
      {/** Форма входа */}
      <LoginForm className={cn('form')} onLogin={onLogin} />
      {/** Перенаправляющий зарегистрированных пользователей текст */}
      <span className={cn('sub-text')}>
        {TEXTS.subtext.text}
        <Link
          component={GenericLink}
          to={PAGE_LINKS.signUp}
          className={cn('link')}
        >
          {TEXTS.subtext.link}
        </Link>
      </span>
    </div>
  );
}

export default Login;
