import {createCn} from 'bem-react-classname';
import React, {forwardRef} from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericButton from '@generic/Button/Button';
/* -------------------------------------------------------------------------- */
import './CloseButton.css';

export type Props = GenericButton.Props;
export type RefType = GenericButton.RefType;

/** Кнопка с крестиком */
export const CloseButton = forwardRef<RefType, Props>(({
  className,
  ...props
}, ref) => {
  const cn = createCn('close-button', className);
  return <GenericButton.Button {...props} ref={ref} className={cn()} />;
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;
