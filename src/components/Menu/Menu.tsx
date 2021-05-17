import {createCn} from 'bem-react-classname';
import React from 'react';
import {useMediaQuery} from 'react-responsive';

import DesktopMenu from '../DesktopMenu/DesktopMenu';

import MobileMenu from '../MobileMenu/MobileMenu';

import './Menu.css';

export type IMenuProps = React.HTMLAttributes<HTMLDivElement>;

const Menu: React.FC<IMenuProps> = ({className, ...props}) => {
  const tabletWidth = 768;
  const isDesktop = useMediaQuery({minWidth: tabletWidth});

  const cn = createCn('menu', className);

  return (
    <div {...props} className={cn()}>
      {isDesktop ? (
        <DesktopMenu>{props.children}</DesktopMenu>
      ) : (
        <MobileMenu>{props.children}</MobileMenu>
      )}
    </div>
  );
};

export default Menu;
