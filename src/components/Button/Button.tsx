import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {Theme} from '../../utils/types';

import './Button.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  disabled?: boolean;
  hidden?: boolean;
  rounded?: boolean;
}

export type RefType = HTMLButtonElement;

const Button = React.forwardRef<RefType, ButtonProps>(
  (
    {
      className,
      theme = Theme.Transparent,
      disabled = false,
      rounded = false,
      hidden = false,
      ...props
    },
    ref,
  ) => {
    const cn = createCn('button', className);

    return (
      <button
        {...filterInvalidDOMProps(props)}
        ref={ref}
        className={cn({
          theme,
          disabled,
          rounded,
          hidden,
        })}
      >
        {props.children}
      </button>
    );
  },
);

export default Button;
