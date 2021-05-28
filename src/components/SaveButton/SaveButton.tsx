import {createCn} from 'bem-react-classname';
import React from 'react';
import {Theme} from '../../utils/types';
import Button, {ButtonProps} from '../Button/Button';

import './SaveButton.css';

export interface SaveButtonProps extends ButtonProps {
  checked?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  className,
  checked = false,
  ...props
}) => {
  const cn = createCn('save-button', className);
  return (
    <Button {...props} theme={Theme.Light} className={cn({checked})}>
      {!checked && 'Сохранить'}
    </Button>
  );
};

export default SaveButton;
