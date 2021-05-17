import {createCn} from 'bem-react-classname';
import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isHidden: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  isHidden = false,
  ...props
}) => {
  const cn = createCn('error-message');
  return <span className={cn({hidden: isHidden})}>{props.children}</span>;
};

export default ErrorMessage;
