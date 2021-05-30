import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import React from 'react';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Field, {FieldProps, RefType as FieldRefType} from '../Field/Field';

import './FieldWrapper.css';

export interface FieldWrapperProps extends FieldProps {
  /** Label поля ввода */
  label?: string;
  /** className поля ввода */
  fieldClassName?: string;
  /** className сообщения об ошибке */
  errorMessageClassName?: string;
}

/**
 * Связующий компонент-обёртка над [полем ввода]{@link Field},
 * [сообщением с ошибкой]{@link ErrorMessage} и [label]{@link HTMLLabelElement}
 *
 * Ссылка пробрасывается к [полю ввода]{@link Field}
 *  */
const FieldWrapper = React.forwardRef<FieldRefType, FieldWrapperProps>(
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

    /**
     * Переменная-флаг видимости ошибки.
     * Ошибка не будет видна до начала ввода в [поле]{@link Field}
     *
     * Попытка отправить форму сделать ошибку видимой
     * */
    const [isErrorMessageHidden, setErrorMessageHidden] = React.useState(true);
    /** Текущее сообщение об ошибке */
    const [errorMessage, setErrorMessage] = React.useState('');
    /**
     * Текст ошибки виден только при наведении
     * @see {@link ErrorMessage}
     * */
    const [isHovered, setHovered] = React.useState(false);

    /** При каждом вводе обновляем состояние ошибки */
    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessageHidden(evt.target.validity.valid);
      setErrorMessage(evt.target.validationMessage);

      onInput?.(evt);
    };

    return (
      <div
        className={cn()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          {...props}
          className={fieldClass}
          ref={ref}
          isError={!isErrorMessageHidden}
          onInput={handleInput}
        />
        <ErrorMessage
          className={errorMessageClass}
          isHidden={isErrorMessageHidden || !isHovered}
        >
          {errorMessage}
        </ErrorMessage>
      </div>
    );
  },
);

export default FieldWrapper;
