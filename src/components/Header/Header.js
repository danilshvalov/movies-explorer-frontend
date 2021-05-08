import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#">
        <img className="header__logo" src={logo} />
      </a>
      <nav className="header__navbar">
        <Navigation className="header__navbar" />
      </nav>
      <Profile className="header__profile" />
    </header>
  );
}

export default Header;
