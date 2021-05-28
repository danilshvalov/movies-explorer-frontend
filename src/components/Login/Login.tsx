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
  onLogin: LoginFunc;
}

const Login: React.FC<LoginProps> = ({onLogin, className, ...props}) => {
  const cn = createCn('login', className);
  return (
    <div {...props} className={cn()}>
      <Logo className={cn('logo')} />
      <h1 className={cn('title')}>{texts.title}</h1>
      <LoginForm className={cn('form')} onLogin={onLogin} />
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
