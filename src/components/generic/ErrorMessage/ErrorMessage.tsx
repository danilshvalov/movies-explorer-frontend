import {createCn} from 'bem-react-classname';
import React from 'react';
/* ---------------------------------- Types --------------------------------- */
import {WithError} from 'types/types';
/* -------------------------------------------------------------------------- */
import './ErrorMessage.css';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    WithError {}

export function ErrorMessage({
  className,
  ...props
}: ErrorMessageProps): JSX.Element {
  const cn = createCn('error-message', className);
  return <span className={cn()}>{props.children}</span>;
}

export default ErrorMessage;
