import {createCn} from 'bem-react-classname';
import React from 'react';

import {Theme} from 'types/types';
import Button, {ButtonProps} from '@generic/Button/Button';

import './SaveButton.css';

export interface SaveButtonProps extends ButtonProps {
  /** Флаг изначального состояния кнопки */
  checked?: boolean;
}

/** Кнопка сохранения */
const SaveButton: React.FC<SaveButtonProps> = ({className, checked = false, ...props}) => {
  const cn = createCn('save-button', className);
  return (
    <Button {...props} theme={Theme.Light} className={cn({checked})}>
      {!checked && 'Сохранить'}
    </Button>
  );
};

export default SaveButton;
