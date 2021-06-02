import {createCn} from 'bem-react-classname';
import React from 'react';

import Button, {
  ButtonProps,
  RefType as ButtonRefType,
} from '../Button/Button';

import './CloseButton.css';

export type CloseButtonProps = ButtonProps;
export type RefType = ButtonRefType;

/** Кнопка с крестиком */
const CloseButton = React.forwardRef<RefType, CloseButtonProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('close-button', className);
    return <Button {...props} ref={ref} className={cn()} />;
  },
);

export default CloseButton;
