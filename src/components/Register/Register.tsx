import {createCn} from 'bem-react-classname';
import React from 'react';

import Logo from '../Logo/Logo';
import RegisterForm, {RegisterFunc} from '../RegisterForm/RegisterForm';

import './Register.css';

export interface RegisterProps extends React.HTMLAttributes<HTMLDivElement> {
  onRegister: RegisterFunc;
}

const Register: React.FC<RegisterProps> = ({
  onRegister,
  className,
  ...props
}) => {
  const cn = createCn('register', className);

  return (
    <section {...props} className={cn()}>
      <Logo className={cn('logo')} />
      <RegisterForm className={cn('form')} onRegister={onRegister} />
      <span className="register__sub-text">
        Уже зарегистрированы?
        <a href="#" className="register__link">
          Войти
        </a>
      </span>
    </section>
  );
};

export default Register;
