import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React, {forwardRef, FormHTMLAttributes} from 'react';
/* -------------------------------------------------------------------------- */
import './Form.css';

export type DOMProps = FormHTMLAttributes<HTMLFormElement>;
export type RefType = HTMLFormElement;
export type Props = DOMProps;

/** Обёртка над {@link HTMLFormElement формой} с измененными стилями */
export const Form = forwardRef<RefType, Props>((props, ref) => {
  const cn = createCn('form', props.className);

  return (
    <form {...filterInvalidDOMProps(props)} ref={ref} className={cn()}>
      {props.children}
    </form>
  );
});

Form.displayName = 'Form';

export default Form;
