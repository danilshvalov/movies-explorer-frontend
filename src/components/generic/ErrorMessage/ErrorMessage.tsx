import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
/* ---------------------------------- Types --------------------------------- */
import {WithError} from 'types/types';
/* -------------------------------------------------------------------------- */
import './ErrorMessage.css';

export interface ErrorMessageProps
  extends HTMLAttributes<HTMLSpanElement>,
    WithError {}

export function ErrorMessage({
  className,
  ...props
}: ErrorMessageProps): JSX.Element {
  const cn = createCn('error-message', className);
  return <span className={cn()} title={props.children as string}>{props.children}</span>;
}

export default ErrorMessage;
