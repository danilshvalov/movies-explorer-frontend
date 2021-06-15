import React, {InputHTMLAttributes, forwardRef} from 'react';
import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* ---------------------------------- Types --------------------------------- */
import {Theme, WithError, WithTheme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './Field.css';

export type DOMProps = InputHTMLAttributes<HTMLInputElement>;
export type FunctionalProps = WithError & WithTheme;
export type Props = DOMProps & FunctionalProps;

export type RefType = HTMLInputElement;

/** Обёртка над [input]{@link HTMLInputElement}, поддерживающая выделение при ошибке */
export const Field = forwardRef<RefType, Props>(
  ({
    className, isError = false, theme = Theme.Transparent, ...props
  }, ref) => {
    const cn = createCn('field', className);

    return (
      <input
        {...filterInvalidDOMProps(props)}
        ref={ref}
        className={cn({error: isError, theme})}
        defaultValue={props.defaultValue || ''}
      />
    );
  },
);

Field.displayName = 'Field';

export default Field;
