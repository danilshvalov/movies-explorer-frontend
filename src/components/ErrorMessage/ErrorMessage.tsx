import {createCn} from 'bem-react-classname';
import React from 'react';

import './ErrorMessage.css';
import Marquee from 'react-fast-marquee';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isHidden: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  isHidden = false,
  ...props
}) => {
  const cn = createCn('error-message', className);
  return (
    <span {...props} className={cn()}>
      {!isHidden && (
        <Marquee className={cn('text')} speed={60} gradient={false}>
          {props.children}
        </Marquee>
      )}
    </span>
  );
};

export default ErrorMessage;
