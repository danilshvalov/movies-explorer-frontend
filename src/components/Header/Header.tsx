import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import {header as texts} from '../../utils/texts';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoginButtons from '../LoginButtons/LoginButtons';
import {DeviceType} from '../../utils/types';
import getDeviceType from '../../utils/device-type';

import './Header.css';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

/** Секция header */
const Header = ({className, ...props}: HeaderProps) => {
  const cn = createCn('header', className);

  /** Текущее устройство пользователя */
  const [deviceType, setDeviceType] = React.useState<DeviceType>(
    DeviceType.Desktop,
  );

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
  const {isLoggedIn} = React.useContext(CurrentUserContext);

  return (
    <header {...filterInvalidDOMProps(props)} className={cn()}>
      <Logo />
      {isLoggedIn ? (
        <Menu className={cn('menu')} isDesktop={isDesktop}>
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
