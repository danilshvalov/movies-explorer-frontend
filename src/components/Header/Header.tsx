import {createCn} from 'bem-react-classname';
import React from 'react';
import {useMediaQuery} from 'react-responsive';

import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import {header as texts} from '../../utils/texts';
import CurrentUserContext from '../../contexts/CurrentUserContexts';
import LoginButtons from '../LoginButtons/LoginButtons';

import './Header.css';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = ({className, ...props}) => {
  const cn = createCn('header', className);
  const isDesktop = useMediaQuery({minWidth: 769});
  const {isLoggedIn} = React.useContext(CurrentUserContext);

  return (
    <header {...props} className={cn()}>
      <Logo />
      {isLoggedIn ? (
        <Menu isDesktop={isDesktop} className={cn('menu')}>
          <Navigation
            linksList={isDesktop ? texts.desktopMenu : texts.mobileMenu}
            underline={!isDesktop}
            className={cn('navigation')}
          />
          <Account className={cn('account')} />
        </Menu>
      ) : (
        <LoginButtons className={cn('login-buttons')} />
      )}
    </header>
  );
};

export default Header;
