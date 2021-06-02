import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {Link} from 'react-router-dom';

import {pageLinks} from '../../utils/config';
import ColoredLink from '../ColoredLink/ColoredLink';
import {register as texts} from '../../utils/texts';
import Logo from '../Logo/Logo';
import RegisterForm, {RegisterFunc} from '../RegisterForm/RegisterForm';

import './Register.css';

export interface RegisterProps extends React.HTMLAttributes<HTMLDivElement> {
  onRegister: RegisterFunc;
}

/** Секция регистрации пользователя */
const Register: React.FC<RegisterProps> = ({
  onRegister,
  className,
  ...props
}) => {
  const cn = createCn('register', className);

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <Logo className={cn('logo')} />
      <h1 className={cn('title')}>{texts.title}</h1>
      {/** Форма регистрации */}
      <RegisterForm className={cn('form')} onRegister={onRegister} />
      {/** Ссылки перенаправления зарегистрированных пользователей */}
      <span className={cn('sub-text')}>
        {texts.subtext.text}
        <Link
          component={ColoredLink}
          to={pageLinks.signIn}
          className={cn('link')}
        >
          {texts.subtext.link}
        </Link>
      </span>
    </section>
  );
};

export default Register;
