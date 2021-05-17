import {createCn} from 'bem-react-classname';
import useKey from '@rooks/use-key';

import React from 'react';
import CloseButton from '../CloseButton/CloseButton';
import HamburgerButton from '../HamburgerButton/HamburgerButton';

import './MobileMenu.css';

export type MobileMenuProps = React.HTMLAttributes<HTMLDivElement>;

const MobileMenu: React.FC<MobileMenuProps> = ({className, ...props}) => {
  const cn = createCn('mobile-menu', className);

  const [isOpen, setOpen] = React.useState(false);

  const handleOpenButtonClick = () => setOpen(true);
  const handleCloseButtonClick = () => setOpen(false);
  const handleEsc = () => setOpen(false);

  useKey(['Escape'], handleEsc, {when: isOpen});

  return (
    <div className={cn()}>
      <HamburgerButton
        className={cn('open-button')}
        onClick={handleOpenButtonClick}
      />
      <div className={cn('container', {visible: isOpen})}>
        <CloseButton
          className={cn('close-button')}
          onClick={handleCloseButtonClick}
        />
        {props.children}
      </div>
    </div>
  );
};

export default MobileMenu;
