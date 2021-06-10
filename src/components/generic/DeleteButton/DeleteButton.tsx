import {createCn} from 'bem-react-classname';
import React from 'react';

import Button, {ButtonProps, RefType as ButtonRefType} from '@generic/Button/Button';

import './DeleteButton.css';

export type DeleteButtonProps = ButtonProps;
export type RefType = ButtonRefType;
export type OnDeleteFunc<T> = (args: T) => any;

/**
 * Кнопка удаления
 *
 * Обёртка над [обычной кнопкой]{@link Button} с картинкой крестика */
const DeleteButton = React.forwardRef<RefType, DeleteButtonProps>(({className, ...props}, ref) => {
  const cn = createCn('delete-button', className);
  return <Button {...props} ref={ref} className={cn()} />;
});

export default DeleteButton;
