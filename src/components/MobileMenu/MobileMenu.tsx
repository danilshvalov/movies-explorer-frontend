import {createCn} from 'bem-react-classname';
import useKey from '@rooks/use-key';

import React from 'react';
import CloseButton from '../CloseButton/CloseButton';
import HamburgerButton from '../HamburgerButton/HamburgerButton';

import './MobileMenu.css';

export type MobileMenuProps = React.HTMLAttributes<HTMLDivElement>;

/** Меню для устройств с небольшим разрешением */
const MobileMenu = ({className, ...props}: MobileMenuProps) => {
  const cn = createCn('mobile-menu', className);

  /** Переменная-флаг, изменяющая видимость меню */
  const [isOpen, setOpen] = React.useState(false);

  /** Handlers */
  const handleOpenButtonClick = () => setOpen(true);
  const handleCloseButtonClick = () => setOpen(false);
  const handleEsc = () => setOpen(false);

  /** Вешаем слушателя кнопки Esc при открытии */
  useKey(['Escape'], handleEsc, {when: isOpen});

  return (
    <div className={cn()}>
      <HamburgerButton
        className={cn('open-button')}
        onClick={handleOpenButtonClick}
      />
      <div className={cn('overlay', {visible: isOpen})}>
        <div className={cn('container', {visible: isOpen})}>
          <CloseButton
            className={cn('close-button')}
            onClick={handleCloseButtonClick}
          />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
