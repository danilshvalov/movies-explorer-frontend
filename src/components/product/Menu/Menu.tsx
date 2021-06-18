import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
/* --------------------------------- Product -------------------------------- */
import DesktopMenu from '@product/DesktopMenu/DesktopMenu';
import MobileMenu from '@product/MobileMenu/MobileMenu';
/* -------------------------------------------------------------------------- */

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps {
  isDesktop: boolean;
}
export type Props = DOMProps & FunctionalProps;

/**
 *  Меню сайта
 *  Изменяется в зависимости от типа устройства
 *  */
export function Menu({className, isDesktop, ...props}: Props): JSX.Element {
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
}

export default Menu;
