import {createCn} from 'bem-react-classname';
import useKey from '@rooks/use-key';
import React, {HTMLAttributes} from 'react';
/* -------------------------------- Generics -------------------------------- */
import CloseButton from '@generic/CloseButton/CloseButton';
import HamburgerButton from '@generic/HamburgerButton/HamburgerButton';
/* -------------------------------------------------------------------------- */
import './MobileMenu.css';

export type Props = HTMLAttributes<HTMLDivElement>;

/** Меню для устройств с небольшим разрешением */
export function MobileMenu({
  className,
  ...props
}: Props): JSX.Element {
  const cn = createCn('mobile-menu', className);

  const [isOpen, setOpen] = React.useState(false);

  /* -------------------------------- Handlers -------------------------------- */
  function handleOpenButtonClick() {
    return setOpen(true);
  }
  function handleCloseButtonClick() {
    return setOpen(false);
  }
  function handleEsc() {
    return setOpen(false);
  }

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
}

export default MobileMenu;
