import {createCn} from 'bem-react-classname';
import {useHistory} from 'react-router-dom';
import React from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericList from '@generic/List/List';
import Button from '@generic/Button/Button';
/* ---------------------------------- Texts --------------------------------- */
import {LOGIN_BUTTONS as TEXTS} from '@texts/generic';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './LoginButtons.css';

export type LoginButtonsProps = GenericList.DOMProps;

/** Кнопки, перенаправляющие пользователя на вход в аккаунт */
function LoginButtons({className, ...props}: LoginButtonsProps): JSX.Element {
  const cn = createCn('login-buttons', className);

  const history = useHistory();

  function handleRegisterClick() {
    return history.push(PAGE_LINKS.signUp);
  }
  function handleLoginClock() {
    return history.push(PAGE_LINKS.signIn);
  }

  return (
    <GenericList.List {...props} className={cn()} itemClassName={cn('list-item')}>
      <Button className={cn('button')} onClick={handleRegisterClick}>
        {TEXTS.register}
      </Button>
      <Button className={cn('button')} onClick={handleLoginClock} theme={Theme.Azure}>
        {TEXTS.login}
      </Button>
    </GenericList.List>
  );
}

export default LoginButtons;
