import {createCn} from 'bem-react-classname';
import React from 'react';
import {Theme} from '../../utils/types';
import Button from '../Button/Button';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import Form, {FormProps} from '../Form/Form';
import {login} from '../../utils/texts';

import './LoginForm.css';

const texts = login.form;

export interface UserData {
  email: string;
  password: string;
}

export interface LoginFunc {
  (userData: UserData): void;
}

export interface LoginFormProps extends FormProps {
  onLogin: LoginFunc;
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onLogin,
  ...props
}) => {
  const cn = createCn('login-form', className);

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );

  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();

  const inputs = [emailInputRef, passwordInputRef];

  const handleInput = () => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input?.current?.validity.valid),
    );
  };

  // submit handlers
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (inputs.every((input) => input?.current?.validity.valid)) {
      onLogin({
        email: emailInputRef?.current?.value as string,
        password: passwordInputRef?.current?.value as string,
      });
    }
  };

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate={true}>
      <fieldset className={cn('fieldset')}>
        <FieldWrapper
          className={cn('field-wrapper')}
          fieldClassName={cn('field')}
          errorMessageClassName={cn('error-message')}
          name="emailInput"
          type="email"
          label={texts.emailInput.label}
          required
          ref={emailInputRef}
          onInput={handleInput}
        />

        <FieldWrapper
          className={cn('field-wrapper')}
          fieldClassName={cn('field')}
          errorMessageClassName={cn('error-message')}
          label={texts.passwordInput.label}
          minLength={8}
          type="password"
          required
          ref={passwordInputRef}
          onInput={handleInput}
        />
      </fieldset>

      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={isSubmitButtonDisabled}
        theme={Theme.Azure}
      >
        {texts.submitButton.text}
      </Button>
    </Form>
  );
};
export default LoginForm;
