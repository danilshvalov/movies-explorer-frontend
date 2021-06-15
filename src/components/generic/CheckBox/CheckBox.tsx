import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React, {forwardRef} from 'react';

import './CheckBox.css';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** className самого checkbox */
  buttonClassName?: string;
  /** className label рядом с кнопкой */
  labelClassName?: string;
  /** Содержание / текст label */
  label?: string;
}

export type RefType = HTMLInputElement;

/** Обёртка над checkbox, поддерживающая label */
const CheckBox = forwardRef<RefType, CheckBoxProps>(
  ({
    label, labelClassName, buttonClassName, className, ...props
  }, ref) => {
    const cn = createCn('checkbox', className);
    const labelClass = classNames(cn('label'), labelClassName);
    const buttonClass = classNames(cn('button'), buttonClassName);

    return (
      <div className={cn()}>
        <input
          {...filterInvalidDOMProps(props)}
          ref={ref}
          className={buttonClass}
          type="checkbox"
        />
        {label && <label className={labelClass}>{label}</label>}
      </div>
    );
  },
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;
