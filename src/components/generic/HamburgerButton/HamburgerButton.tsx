import {createCn} from 'bem-react-classname';
import React from 'react';
/* --------------------------------- Generic -------------------------------- */
import * as GenericButton from '@generic/Button/Button';
/* -------------------------------------------------------------------------- */
import './HamburgerButton.css';

export type HamburgerButtonProps = GenericButton.Props;
export type RefType = GenericButton.RefType;

/**
 * Кнопка "гамбургер" (≡)
 * @see {@link GenericButton.Button Button}
 * */
const HamburgerButton = React.forwardRef<RefType, HamburgerButtonProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('hamburger-button', className);

    return <GenericButton.Button {...props} ref={ref} className={cn()} />;
  },
);

HamburgerButton.displayName = 'HamburgerButton';

export default HamburgerButton;
