import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes, forwardRef} from 'react';
/* -------------------------------------------------------------------------- */
import './FieldWrapper.css';

export type Props = HTMLAttributes<HTMLDivElement>;
export type RefType = HTMLDivElement;

/** Обертка с подсветкой поля ввода */
export const FieldWrapper = forwardRef<RefType, Props>(
  (props, ref): JSX.Element => {
    const cn = createCn('field-wrapper', props.className);
    return (
      <div className={cn()} ref={ref}>
        {props.children}
      </div>
    );
  },
);

FieldWrapper.displayName = 'FieldWrapper';

export default FieldWrapper;
