import React, {createCn} from 'bem-react-classname';
import {FormEvent, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import Field from '@generic/Field/Field';
import FieldWrapper from '@generic/FieldWrapper/FieldWrapper';
import * as GenericForm from '@generic/Form/Form';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
import useSafeAsyncCall from '@hooks/UseSafeAsyncCall';
/* ---------------------------------- Utils --------------------------------- */
import {REGISTER} from '@texts/product';
/* ---------------------------------- Types --------------------------------- */
import {OnRegisterFunc, Theme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './RegisterForm.css';

const texts = REGISTER.form;

export type DOMProps = GenericForm.DOMProps;
export interface FunctionalProps {
  onRegister: OnRegisterFunc;
}
export type Props = DOMProps & FunctionalProps;

export function RegisterForm({
  onRegister,
  ...props
}: Props): JSX.Element {
  const cn = createCn('register-form', props.className);

  const {
    values,
    handleChange,
    errors,
    isValid,
    isFieldValid,
  } = useFormWithValidation({
    nameInput: '',
    emailInput: '',
    passwordInput: '',
  });

  const [APIError, setAPIError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const call = useSafeAsyncCall();

  /* -------------------------------- Handlers -------------------------------- */

  function handleAPIError(err: Error) {
    call(() => setAPIError(err.message));
  }

  function handlePreSubmit() {
    setIsProcessing(true);
  }

  function handleProcessFinalization() {
    call(() => setIsProcessing(false));
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const nameValue = values.nameInput;
    const emailValue = values.emailInput;
    const passwordValue = values.passwordInput;

    if (
      isValid
      && nameValue
      && emailValue
      && passwordValue
    ) {
      handlePreSubmit();
      onRegister({
        name: values.nameInput as string,
        email: values.emailInput as string,
        password: values.passwordInput as string,
      })
        .catch(handleAPIError)
        .finally(handleProcessFinalization);
    }
  };

  return (
    <GenericForm.Form
      {...props}
      className={cn()}
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className={cn('fieldset')}>
        {/** Поле с именем */}

        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>
              {texts.nameInput.label}
            </label>
            <Field
              className={cn('field')}
              name={'nameInput'}
              onChange={handleChange}
              minLength={2}
              isError={!isFieldValid('nameInput')}
              required
              disabled={isProcessing}
            />
          </FieldWrapper>
          <ErrorMessage className={cn('field-error')}>
            {errors.nameInput}
          </ErrorMessage>
        </div>

        {/** Поле с Email */}
        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>
              {texts.emailInput.label}
            </label>
            <Field
              className={cn('field')}
              name={'emailInput'}
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
            <label className={cn('label')}>
              {texts.passwordInput.label}
            </label>
            <Field
              className={cn('field')}
              name={'passwordInput'}
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
      <ErrorMessage className={cn('submit-error')}>
        {APIError}
      </ErrorMessage>
      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={!isValid || isProcessing}
        theme={Theme.Azure}
      >
        {isProcessing
          ? texts.submitButton.loadingText
          : texts.submitButton.text}
      </Button>
    </GenericForm.Form>
  );
}

export default RegisterForm;
