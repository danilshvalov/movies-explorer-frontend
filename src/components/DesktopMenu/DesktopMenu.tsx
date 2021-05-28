import {createCn} from 'bem-react-classname';
import React from 'react';

import './DesktopMenu.css';

export type DesktopMenuProps = React.HTMLAttributes<HTMLDivElement>;

const DesktopMenu: React.FC<DesktopMenuProps> = ({className, ...props}) => {
  const cn = createCn('desktop-menu', className);

  return <div className={cn()}>{props.children}</div>;
};

export default DesktopMenu;
