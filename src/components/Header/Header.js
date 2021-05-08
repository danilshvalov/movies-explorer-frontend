import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#">
        <img className="header__logo" src={logo} />
      </a>
      <Navigation className="header__navbar" />
      <Account className="header__account" />
    </header>
  );
}

export default Header;
