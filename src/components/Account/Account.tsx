import {createCn} from 'bem-react-classname';
import React from 'react';
import Button, {ButtonTheme} from '../Button/Button';
import List from '../List/List';

import './Account.css';

function Account(props: React.HTMLAttributes<HTMLDivElement>) {
  const isLoggedIn = true;
  const cn = createCn('account', props.className);
  return (
    <div {...props} className={cn()}>
      {isLoggedIn ? (
        <div className="11"></div>
      ) : (
        <List className={cn('list')} itemClassName={cn('list-item')}>
          <Button className={cn('button')}>Регистрация</Button>
          <Button className={cn('button')} theme={ButtonTheme.Azure}>
            Войти
          </Button>
        </List>
      )}
    </div>
  );
}

export default Account;
