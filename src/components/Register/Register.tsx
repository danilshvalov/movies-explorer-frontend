import {createCn} from 'bem-react-classname';
import React from 'react';
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

const Register: React.FC<RegisterProps> = ({
  onRegister,
  className,
  ...props
}) => {
  const cn = createCn('register', className);

  return (
    <section {...props} className={cn()}>
      <Logo className={cn('logo')} />
      <h1 className={cn('title')}>{texts.title}</h1>
      <RegisterForm className={cn('form')} onRegister={onRegister} />
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
