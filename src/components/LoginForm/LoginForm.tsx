import {createCn} from 'bem-react-classname';
import React from 'react';
import Button, {ButtonTheme} from '../Button/Button';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import Form, {FormProps} from '../Form/Form';

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
        email: emailInputRef?.current?.value || '',
        password: passwordInputRef?.current?.value || '',
      });
    }
  };

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate={true}>
      <FieldWrapper
        className={cn('field-wrapper')}
        fieldClassName={cn('field')}
        errorMessageClassName={cn('error-message')}
        name="emailInput"
        type="email"
        label="E-mail"
        required
        ref={emailInputRef}
        onInput={handleInput}
      />

      <FieldWrapper
        className={cn('field-wrapper')}
        fieldClassName={cn('field')}
        errorMessageClassName={cn('error-message')}
        label="Пароль"
        minLength={8}
        required
        ref={passwordInputRef}
        onInput={handleInput}
      />

      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={isSubmitButtonDisabled}
        theme={ButtonTheme.Azure}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};
export default LoginForm;
