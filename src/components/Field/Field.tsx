import React from 'react';
import {createCn} from 'bem-react-classname';

import './Field.css';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const cn = createCn('field', props.className);

  return <input {...props} ref={ref} className={cn({error: props.isError || false})} />;
});

export default Field;
