import {createCn} from 'bem-react-classname';
import React from 'react';

import Button from '@Button/Button';
import Form, {FormProps} from '@generic/Form/Form';
import {register} from '@utils/texts';
import {ApiCallback, Theme} from 'types/types';
import {RegisterUserData} from 'types/User';
import {useFormWithValidation} from '@utils/hooks';
import Field from '@generic/Field/Field';
import ErrorMessage from '@ErrorMessage/ErrorMessage';

import './RegisterForm.css';

const texts = register.form;

/** callback функция при отправке формы */
export type RegisterFunc = ApiCallback<RegisterUserData>;

export interface RegisterFormProps extends FormProps {
  onRegister: RegisterFunc;
}

const RegisterForm = ({onRegister, ...props}: RegisterFormProps) => {
  const cn = createCn('register-form', props.className);

  enum Fields {
    nameInput,
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
      setIsProcessing(true);
      onRegister({
        name: values.nameInput as string,
        email: values.emailInput as string,
        password: values.passwordInput as string,
      })
        .catch(setAPIError)
        .finally(() => setIsProcessing(false));
    }
  };

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate>
      <fieldset className={cn('fieldset')}>
        {/** Поле с именем */}

        <div className={cn('container')}>
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.nameInput.label}</label>
            <Field
              className={cn('field')}
              name={Fields[Fields.nameInput]}
              onChange={handleChange}
              minLength={2}
              isError={!fieldsValidity.nameInput}
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.nameInput}</ErrorMessage>
        </div>

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
      <Button className={cn('submit-button')} type="submit" disabled={isValid} theme={Theme.Azure}>
        {isProcessing ? texts.submitButton.loadingText : texts.submitButton.text}
      </Button>
    </Form>
  );
};

export default RegisterForm;
