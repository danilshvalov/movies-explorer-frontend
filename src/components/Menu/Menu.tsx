import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

import './Menu.css';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isDesktop: boolean;
}

const Menu: React.FC<MenuProps> = ({className, isDesktop, ...props}) => {
  const cn = createCn('menu', className);

  return isDesktop ? (
    <DesktopMenu {...filterInvalidDOMProps(props)} className={cn()}>
      {props.children}
    </DesktopMenu>
  ) : (
    <MobileMenu {...props} className={cn()}>
      {props.children}
    </MobileMenu>
  );
};

export default Menu;
