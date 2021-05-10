import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';

import './Header.css';
import Button from '../Button/Button';

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#">
        <Logo />
      </a>
      <Button className="header__hamburger-button" />
      <div className="header__container header__container_visible">
        <Navigation className="header__navbar" />
        <Account className="header__account" />
      </div>
    </header>
  );
}

export default Header;
