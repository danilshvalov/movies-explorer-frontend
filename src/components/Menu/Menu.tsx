import {createCn} from 'bem-react-classname';
import React from 'react';

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isDesktop: boolean;
}

/**
 *  Меню сайта
 *  Изменяется в зависимости от типа устройства
 *  */
const Menu = ({className, isDesktop, ...props}: MenuProps) => {
  const cn = createCn('menu', className);

  return (
    <div className={cn()}>
      {isDesktop ? (
        <DesktopMenu {...props} className={cn('desktop-menu')}>
          {props.children}
        </DesktopMenu>
      ) : (
        <MobileMenu {...props} className={cn('mobile-menu')}>
          {props.children}
        </MobileMenu>
      )}
    </div>
  );
};

export default Menu;
