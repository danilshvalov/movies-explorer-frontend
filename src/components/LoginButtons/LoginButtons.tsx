import React from 'react';
import {createCn} from 'bem-react-classname';

import Button from '../Button/Button';
import List, {ListProps} from '../List/List';
import {loginButtons as texts} from '../../utils/texts';
import {Theme} from '../../utils/types';

import './LoginButtons.css';

export type LoginButtonsProps = Omit<ListProps, 'itemClassName'>;

/** Кнопки, перенаправляющие пользователя на вход в аккаунт */
const LoginButtons: React.FC<LoginButtonsProps> = ({className, ...props}) => {
  const cn = createCn('login-buttons', className);

  return (
    <List {...props} className={cn()} itemClassName={cn('list-item')}>
      <Button className={cn('button')}>{texts.register}</Button>
      <Button className={cn('button')} theme={Theme.Azure}>
        {texts.login}
      </Button>
    </List>
  );
};

export default LoginButtons;
