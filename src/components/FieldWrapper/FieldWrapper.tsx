import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Field, {FieldProps} from '../Field/Field';
import Label from '../Label/Label';

import './FieldWrapper.css';

export interface FieldWrapperProps extends FieldProps {
  label?: string;
  fieldClassName?: string;
  errorMessageClassName?: string;
}

const FieldWrapper = React.forwardRef<HTMLInputElement, FieldWrapperProps>(
  (
    {
      className,
      label,
      fieldClassName,
      errorMessageClassName,
      name,
      onInput,
      ...props
    },
    ref,
  ) => {
    const cn = createCn('field-wrapper', className);
    const fieldClass = classNames(cn('field'), fieldClassName);
    const errorMessageClass = classNames(
      cn('error-message'),
      errorMessageClassName,
    );

    const [isErrorMessageHidden, setErrorMessageHidden] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessageHidden(evt.target.validity.valid);
      setErrorMessage(evt.target.validationMessage);

      if (onInput) {
        onInput(evt);
      }
    };

    return (
      <div className={cn()}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Field
          {...props}
          className={fieldClass}
          ref={ref}
          isError={!isErrorMessageHidden}
          onInput={handleInput}
        />
        <ErrorMessage
          className={errorMessageClass}
          isHidden={isErrorMessageHidden}
        >
          {errorMessage}
        </ErrorMessage>
      </div>
    );
  },
);

export default FieldWrapper;
