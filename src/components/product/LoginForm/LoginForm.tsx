import {createCn} from 'bem-react-classname';
import React from 'react';

import {ApiCallback, Theme} from 'types/types';
import Button from '@/Button';
import Form, {FormProps} from '@/Form/Form';
import {login} from '@utils/texts';
import {LoginUserData} from 'types/User';
import {useFormWithValidation} from '@utils/hooks';
import Field from '@/Field/Field';
import ErrorMessage from '@/ErrorMessage';

import './LoginForm.css';

const texts = login.form;

/** Тип возвращаемых данных  */

/** Тип callback функции */
export type LoginFunc = ApiCallback<LoginUserData>;

export interface LoginFormProps extends FormProps {
  /** callback, вызываемый при отправке формы */
  onLogin: LoginFunc;
}

/** Форма входа в аккаунт */
const LoginForm = ({className, onLogin, ...props}: LoginFormProps) => {
  const cn = createCn('login-form', className);

  enum Fields {
    emailInput,
    passwordInput,
  }

  const {values, handleChange, errors, fieldsValidity, isValid} =
    useFormWithValidation<typeof Fields>();

  const [APIError, setAPIError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      onLogin({
        email: values.emailInput as string,
        password: values.passwordInput as string,
      })
        .catch((err) => setAPIError(err))
        .finally(() => setIsProcessing(false));
    }
  };

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate={true}>
      <fieldset className={cn('fieldset')}>
        {/** Поле с Email */}
        <div className={cn('container')}>
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.emailInput.label}</label>
            <Field
              className={cn('field')}
              name={Fields[Fields.emailInput]}
              onChange={handleChange}
              isError={!fieldsValidity.emailInput}
              type="email"
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.emailInput}</ErrorMessage>
        </div>

        {/** Поле с паролем */}
        <div className={cn('container')}>
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.passwordInput.label}</label>
            <Field
              className={cn('field')}
              name={Fields[Fields.passwordInput]}
              onChange={handleChange}
              minLength={8}
              isError={!fieldsValidity.passwordInput}
              type="password"
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.passwordInput}</ErrorMessage>
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <ErrorMessage className={cn('submit-error')}>{APIError}</ErrorMessage>
      <Button className={cn('submit-button')} type="submit" disabled={!isValid} theme={Theme.Azure}>
        {isProcessing ? texts.submitButton.loadingText : texts.submitButton.text}
      </Button>
    </Form>
  );
};
export default LoginForm;
