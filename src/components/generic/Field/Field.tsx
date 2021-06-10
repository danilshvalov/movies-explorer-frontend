import React from 'react';
import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import {Theme, WithError} from 'types/types';

import './Field.css';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement>, WithError {
  /** Цветовое решение поля */
  theme?: Theme;
}

export type RefType = HTMLInputElement;

/** Обёртка над [input]{@link HTMLInputElement}, поддерживающая выделение при ошибке */
const Field = React.forwardRef<RefType, FieldProps>(
  ({className, isError = false, theme = Theme.Transparent, ...props}, ref) => {
    const cn = createCn('field', className);

    return (
      <input {...filterInvalidDOMProps(props)} ref={ref} className={cn({error: isError, theme})} />
    );
  },
);

export default Field;
