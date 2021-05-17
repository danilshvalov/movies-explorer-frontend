import {createCn} from 'bem-react-classname';
import React from 'react';

import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import ColoredLink from '../ColoredLink/ColoredLink';

import './Header.css';

function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  const cn = createCn('header', props.className);
  return (
    <header {...props} className={cn()}>
      <ColoredLink className={cn('link')} to="/">
        <Logo />
      </ColoredLink>
      <Menu className={cn('menu')}>
        <Navigation className={cn('navigation')} />
        <Account className={cn('account')} />
      </Menu>
    </header>
  );
}

export default Header;
