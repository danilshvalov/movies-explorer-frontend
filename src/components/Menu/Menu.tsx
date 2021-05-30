import {createCn} from 'bem-react-classname';
import React from 'react';

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
// import {DeviceType} from '../../utils/types';
// import DeviceTypeContext from '../../contexts/DeviceTypeContext';

import './Menu.css';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isDesktop: boolean;
}

/**
 *  Меню сайта
 *  Изменяется в зависимости от типа устройства
 *  */
const Menu = ({className, isDesktop, ...props}: MenuProps) => {
  // const deviceContext = React.useContext(DeviceTypeContext);
  // const isDesktop = deviceContext.deviceType === DeviceType.Desktop;
  const cn = createCn('menu', className);

  return isDesktop ? (
    <DesktopMenu {...props} className={cn()}>
      {props.children}
    </DesktopMenu>
  ) : (
    <MobileMenu {...props} className={cn()}>
      {props.children}
    </MobileMenu>
  );
};

export default Menu;
