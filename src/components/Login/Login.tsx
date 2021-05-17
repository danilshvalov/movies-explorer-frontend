import {createCn} from 'bem-react-classname';
import React from 'react';
import LoginForm, {LoginFunc} from '../LoginForm/LoginForm';

import './Login.css';

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  onLogin: LoginFunc;
}

const Login: React.FC<LoginProps> = ({onLogin, className, ...props}) => {
  const cn = createCn('login', className);
  return (
    <div {...props} className={cn()}>
      <LoginForm className={cn('form')} onLogin={onLogin} />
    </div>
  );
};

export default Login;
