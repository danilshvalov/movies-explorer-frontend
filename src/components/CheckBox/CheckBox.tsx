import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import React from 'react';
import './CheckBox.css';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonClassName?: string;
  labelClassName?: string;
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  labelClassName,
  buttonClassName,
  className,
  ...props
}) => {
  const cn = createCn('checkbox', className);
  const labelClass = classNames(cn('label'), labelClassName);
  const buttonClass = classNames(cn('button'), buttonClassName);
  return (
    <div className={cn()}>
      <input {...props} className={buttonClass} type="checkbox" />
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default CheckBox;
