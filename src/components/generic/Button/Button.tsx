import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React, {ButtonHTMLAttributes, forwardRef} from 'react';
/* ---------------------------------- Types --------------------------------- */
import {Theme, WithLoading, WithTheme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './Button.css';

export type DOMProps = ButtonHTMLAttributes<HTMLButtonElement>;
export interface FunctionalProps extends WithTheme, WithLoading {
  hidden?: boolean;
}
export type Props = DOMProps & FunctionalProps;

export type RefType = HTMLButtonElement;

/**
 * Обёртка над обычной кнопкой, поддерживающая разные цветовые решения
 *
 * @see {@link Theme}
 * */
export const Button = forwardRef<RefType, Props>(
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

Button.displayName = 'Button';

export default Button;
