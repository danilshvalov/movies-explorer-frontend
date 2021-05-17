import {createCn} from 'bem-react-classname';
import React from 'react';

import './DesktopMenu.css';

function DesktopMenu(props: React.HTMLAttributes<HTMLDivElement>) {
  const cn = createCn('desktop-menu', props.className);
  return <div className={cn()}>{props.children}</div>;
}

export default DesktopMenu;
