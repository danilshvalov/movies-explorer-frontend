import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import './Label.css';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({className, ...props}) => {
  const cn = createCn('label', className);

  return (
    <label {...filterInvalidDOMProps(props)} className={cn()}>
      {props.children}
    </label>
  );
};

export default Label;
