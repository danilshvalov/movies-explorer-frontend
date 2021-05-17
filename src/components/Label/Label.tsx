import {createCn} from 'bem-react-classname';
import React from 'react';

import './Label.css';

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const cn = createCn('label', props.className);

  return (
    <label {...props} className={cn()}>
      {props.children}
    </label>
  );
};

export default Label;
