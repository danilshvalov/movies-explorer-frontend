import {createCn} from 'bem-react-classname';
import React from 'react';
/* -------------------------------- Generics -------------------------------- */
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import Field from '@generic/Field/Field';
import * as GenericForm from '@generic/Form/Form';
import Button from '@generic/Button/Button';
/* ---------------------------------- Types --------------------------------- */
import {OnLoginFunc, Theme} from 'types/types';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
/* ---------------------------------- Utils --------------------------------- */
import {login} from '@utils/texts';
/* -------------------------------------------------------------------------- */
import './LoginForm.css';

const texts = login.form;

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
        .catch((err) => setAPIError(err))
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
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.emailInput.label}</label>
            <Field
              className={cn('field')}
              name="emailInput"
              onChange={handleChange}
              isError={!isFieldValid('emailInput')}
              type="email"
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>
            {errors.emailInput}
          </ErrorMessage>
        </div>

        {/** Поле с паролем */}
        <div className={cn('container')}>
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.passwordInput.label}</label>
            <Field
              className={cn('field')}
              name="passwordInput"
              onChange={handleChange}
              minLength={8}
              isError={!isFieldValid('passwordInput')}
              type="password"
              required
            />
          </div>
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
        disabled={!isValid}
        theme={Theme.Azure}
      >
        {
          isProcessing
            ? texts.submitButton.loadingText
            : texts.submitButton.text
        }
      </Button>
    </GenericForm.Form>
  );
};
export default LoginForm;
