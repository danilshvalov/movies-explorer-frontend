import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {Theme} from '../../utils/types';

import './Button.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Внешний вид кнопки */
  theme?: Theme;
  /** Состояние выключенной кнопки */
  disabled?: boolean;
  /** Сокрытие видимости кнопки */
  hidden?: boolean;
}

export type RefType = HTMLButtonElement;

/** Обёртка над обычной кнопкой, поддерживающая разные цветовые решения */
const Button = React.forwardRef<RefType, ButtonProps>(
  (
    {
      className,
      theme = Theme.Transparent,
      disabled = false,
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
          hidden,
        })}
      >
        {props.children}
      </button>
    );
  },
);

export default Button;
