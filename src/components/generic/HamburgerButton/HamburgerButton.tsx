import {createCn} from 'bem-react-classname';
import React from 'react';

import Button, {ButtonProps, RefType as ButtonRefType} from '@Button/Button';

import './HamburgerButton.css';

export type HamburgerButtonProps = ButtonProps;
export type RefType = ButtonRefType;

/**
 * Кнопка "гамбургер" (≡)
 * @see Button
 * */
const HamburgerButton = React.forwardRef<RefType, HamburgerButtonProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('hamburger-button', className);

    return <Button {...props} ref={ref} className={cn()} />;
  },
);

export default HamburgerButton;
