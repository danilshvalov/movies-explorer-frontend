import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

// TODO что-то с этим сделать
import Navigation from '@product/Navigation/Navigation';
import Account from '@product/Account/Account';
import Logo from '@generic/Logo/Logo';
import Menu from '@product/Menu/Menu';
//
import LoginButtons from '@generic/LoginButtons/LoginButtons';
/* ---------------------------------- Utils --------------------------------- */
import getDeviceType from '@utils/device-type';
/* ---------------------------------- Texts --------------------------------- */
import {HEADER as TEXTS} from '@texts/product';
/* ---------------------------------- Types --------------------------------- */
import {DeviceType} from 'types/types';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* -------------------------------------------------------------------------- */
import './Header.css';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

/** Секция header */
const Header = ({className, ...props}: HeaderProps) => {
  const cn = createCn('header', className);

  /** Текущее устройство пользователя */
  const [deviceType, setDeviceType] = React.useState<DeviceType>(DeviceType.Desktop);

  /** Обработчик обновления текущего устройства */
  React.useEffect(() => {
    const handleWindowResize = () => setDeviceType(
      getDeviceType({
        desktop: 1280,
        tablet: 768,
        phone: 320,
      }),
    );

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const isDesktop = deviceType === DeviceType.Desktop;
  const {loggedIn: isLoggedIn} = React.useContext(CurrentUserContext);

  return (
    <header {...filterInvalidDOMProps(props)} className={cn()}>
      <Logo />
      {isLoggedIn ? (
        <Menu className={cn('menu')} isDesktop={isDesktop}>
          <Navigation
            linksList={isDesktop ? TEXTS.desktopMenu : TEXTS.mobileMenu}
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
