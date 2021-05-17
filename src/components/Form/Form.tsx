import {createCn} from 'bem-react-classname';
import React from 'react';

import './Form.css';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form: React.FC<FormProps> = (props) => {
  const cn = createCn('form', props.className);

  return (
    <form {...props} className={cn()}>
      {props.children}
    </form>
  );
};

export default Form;
