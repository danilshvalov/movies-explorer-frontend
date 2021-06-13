import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {Link} from 'react-router-dom';
/* --------------------------------- Generic -------------------------------- */
import Logo from '@generic/Logo/Logo';
import {Link as GenericLink} from '@generic/Link/Link';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
import {REGISTER as TEXTS} from '@texts/product';
/* ---------------------------------- Types --------------------------------- */
import {OnRegisterFunc} from 'types/types';
/* ---------------------------------- Local --------------------------------- */
import RegisterForm from '@product/RegisterForm/RegisterForm';
/* -------------------------------------------------------------------------- */
import './Register.css';

export interface RegisterProps extends React.HTMLAttributes<HTMLDivElement> {
  onRegister: OnRegisterFunc;
}

/** Секция регистрации пользователя */
export function Register({className, onRegister, ...props}: RegisterProps): JSX.Element {
  const cn = createCn('register', className);

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <Logo className={cn('logo')} />
      <h1 className={cn('title')}>{TEXTS.title}</h1>
      {/** Форма регистрации */}
      <RegisterForm className={cn('form')} onRegister={onRegister} />
      {/** Ссылки перенаправления зарегистрированных пользователей */}
      <span className={cn('sub-text')}>
        {TEXTS.subtext.text}
        <Link component={GenericLink} to={PAGE_LINKS.signIn} className={cn('link')}>
          {TEXTS.subtext.link}
        </Link>
      </span>
    </section>
  );
}

export default Register;
