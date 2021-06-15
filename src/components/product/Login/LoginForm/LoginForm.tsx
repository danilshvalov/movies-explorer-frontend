import {createCn} from 'bem-react-classname';
import React from 'react';
/* -------------------------------- Generics -------------------------------- */
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import Field from '@generic/Field/Field';
import * as GenericForm from '@generic/Form/Form';
import Button from '@generic/Button/Button';
import FieldWrapper from '@generic/FieldWrapper/FieldWrapper';
/* ---------------------------------- Types --------------------------------- */
import {OnLoginFunc, Theme} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
/* ---------------------------------- Texts --------------------------------- */
import {LOGIN} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './LoginForm.css';

const TEXTS = LOGIN.form;

export type DOMProps = GenericForm.DOMProps;
export interface FunctionalProps {
  onLogin: OnLoginFunc;
}

export type Props = DOMProps & FunctionalProps;

/** Форма входа в аккаунт */
const LoginForm = ({className, onLogin, ...props}: Props): JSX.Element => {
  const cn = createCn('login-form', className);

  const {
    values,
    handleChange,
    errors,
    isValid,
    isFieldValid,
  } = useFormWithValidation({
    emailInput: '',
    passwordInput: '',
  });

  const [APIError, setAPIError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  function handleAPIError(err: Error) {
    setAPIError(err.message);
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const emailValue = values.emailInput;
    const passwordValue = values.passwordInput;

    if (isValid && emailValue && passwordValue) {
      setIsProcessing(true);
      onLogin({
        email: emailValue,
        password: passwordValue,
      })
        .catch(handleAPIError)
        .finally(() => setIsProcessing(false));
    }
  };

  return (
    <GenericForm.Form
      {...(props as GenericForm.Props)}
      className={cn()}
      onSubmit={handleSubmit}
      noValidate={true}
    >
      <fieldset className={cn('fieldset')}>
        {/** Поле с Email */}
        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>{TEXTS.emailInput.label}</label>
            <Field
              className={cn('field')}
              name="emailInput"
              onChange={handleChange}
              isError={!isFieldValid('emailInput')}
              type="email"
              required
              disabled={isProcessing}
            />
          </FieldWrapper>
          <ErrorMessage className={cn('field-error')}>
            {errors.emailInput}
          </ErrorMessage>
        </div>

        {/** Поле с паролем */}
        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>{TEXTS.passwordInput.label}</label>
            <Field
              className={cn('field')}
              name="passwordInput"
              onChange={handleChange}
              minLength={8}
              isError={!isFieldValid('passwordInput')}
              type="password"
              required
              disabled={isProcessing}
            />
          </FieldWrapper>
          <ErrorMessage className={cn('field-error')}>
            {errors.passwordInput}
          </ErrorMessage>
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <ErrorMessage className={cn('submit-error')}>{APIError}</ErrorMessage>
      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={!isValid || isProcessing}
        theme={Theme.Azure}
      >
        {
          isProcessing
            ? TEXTS.submitButton.loadingText
            : TEXTS.submitButton.text
        }
      </Button>
    </GenericForm.Form>
  );
};
export default LoginForm;
