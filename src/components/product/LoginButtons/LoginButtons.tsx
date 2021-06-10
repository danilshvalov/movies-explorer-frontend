import React from 'react';
import {createCn} from 'bem-react-classname';
import {useHistory} from 'react-router-dom';

import Button from '@/Button';
import List, {DOMProps as ListDOMProps} from '@/List/List';
import {loginButtons as texts} from '@utils/texts';
import {Theme} from 'types/types';

import './LoginButtons.css';
import {PAGE_LINKS} from '@utils/config';

export type LoginButtonsProps = ListDOMProps;

/** Кнопки, перенаправляющие пользователя на вход в аккаунт */
const LoginButtons = ({className, ...props}: LoginButtonsProps) => {
  const cn = createCn('login-buttons', className);

  const history = useHistory();

  const handleRegisterClick = () => history.push(PAGE_LINKS.signUp);
  const handleLoginClock = () => history.push(PAGE_LINKS.signIn);

  return (
    <List {...props} className={cn()} itemClassName={cn('list-item')}>
      <Button className={cn('button')} onClick={handleRegisterClick}>
        {texts.register}
      </Button>
      <Button className={cn('button')} onClick={handleLoginClock} theme={Theme.Azure}>
        {texts.login}
      </Button>
    </List>
  );
};

export default LoginButtons;
