import {createCn} from 'bem-react-classname';
import React from 'react';

import './ErrorMessage.css';
import {WithError} from 'types/types';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLSpanElement>, WithError {}

const ErrorMessage = ({className, ...props}: ErrorMessageProps) => {
  const cn = createCn('error-message', className);
  return <span className={cn()}>{props.children}</span>;
};

export default ErrorMessage;

export function withErrorMessage<P extends WithError>(
  Component: React.ComponentType<P>,
  fixedProps?: P,
) {
  return (props: P & ErrorMessageProps) => (
    <>
      <Component {...(props as P)} {...fixedProps} />
      <ErrorMessage {...(props as ErrorMessageProps)} />
    </>
  );
}
