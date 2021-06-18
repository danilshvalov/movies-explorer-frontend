import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
/* -------------------------------------------------------------------------- */
import './DesktopMenu.css';

export type Props = HTMLAttributes<HTMLDivElement>;

/** Меню, отображаемое на ПК */
export function DesktopMenu({className, ...props}: Props): JSX.Element {
  const cn = createCn('desktop-menu', className);

  return <div className={cn()}>{props.children}</div>;
}

export default DesktopMenu;
