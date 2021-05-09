import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#">
        <Logo />
      </a>
      <Navigation className="header__navbar" />
      <Account className="header__account" />
    </header>
  );
}

export default Header;
