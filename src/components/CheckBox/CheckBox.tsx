import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import './CheckBox.css';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonClassName?: string;
  labelClassName?: string;
  label?: string;
}

export type RefType = HTMLInputElement;

const CheckBox = React.forwardRef<RefType, CheckBoxProps>(
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
        <label className={labelClass}>{label}</label>
      </div>
    );
  },
);

export default CheckBox;
