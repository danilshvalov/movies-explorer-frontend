import {createCn} from 'bem-react-classname';
import React, {forwardRef} from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericButton from '@generic/Button/Button';
/* -------------------------------------------------------------------------- */
import './DeleteButton.css';

export type DeleteButtonProps = GenericButton.Props;
export type RefType = GenericButton.RefType;

/**
 * Кнопка удаления
 *
 * Обёртка над [обычной кнопкой]{@link Button} с картинкой крестика */
const DeleteButton = forwardRef<RefType, DeleteButtonProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('delete-button', className);
    return (
      <GenericButton.Button
        {...props}
        ref={ref}
        className={cn({loading: props.isLoading ?? false})}
      />
    );
  },
);

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
