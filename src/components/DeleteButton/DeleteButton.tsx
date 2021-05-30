import {createCn} from 'bem-react-classname';
import React from 'react';
import Button, {ButtonProps, RefType as ButtonRefType} from '../Button/Button';

import './DeleteButton.css';

export type DeleteButtonProps = ButtonProps;
export type RefType = ButtonRefType;

/**
 * Кнопка удаления
 *
 * Обёртка над [обычной кнопкой]{@link Button} с картинкой крестика */
const DeleteButton = React.forwardRef<RefType, DeleteButtonProps>(
  ({className, ...props}) => {
    const cn = createCn('delete-button', className);
    return <Button {...props} className={cn()} />;
  },
);

export default DeleteButton;
