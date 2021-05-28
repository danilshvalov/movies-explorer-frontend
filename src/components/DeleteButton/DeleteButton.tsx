import {createCn} from 'bem-react-classname';
import React from 'react';
import Button, {ButtonProps} from '../Button/Button';

import './DeleteButton.css';

export type DeleteButtonProps = ButtonProps;

const DeleteButton: React.FC<DeleteButtonProps> = ({className, ...props}) => {
  const cn = createCn('delete-button', className);
  return <Button {...props} className={cn()} />;
};

export default DeleteButton;
