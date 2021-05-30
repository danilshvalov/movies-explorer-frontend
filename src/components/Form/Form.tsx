import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import './Form.css';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

/** Обёртка над HTML <form/> с измененными стилями */
const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const cn = createCn('form', props.className);

  return (
    <form {...filterInvalidDOMProps(props)} ref={ref} className={cn()}>
      {props.children}
    </form>
  );
});

export default Form;
