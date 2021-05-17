import {createCn} from 'bem-react-classname';
import React from 'react';

import Button, {ButtonTheme} from '../Button/Button';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import Form, {FormProps} from '../Form/Form';
import {register} from '../../utils/texts';

import './RegisterForm.css';

const texts = register.form;

export interface UserData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterFunc {
  (userData: UserData): void;
}

export interface RegisterFormProps extends FormProps {
  onRegister: RegisterFunc;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  ...props
}) => {
  const cn = createCn('register-form', props.className);

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );

  // refs
  const nameInputRef = React.createRef<HTMLInputElement>();
  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();

  const inputs = [nameInputRef, emailInputRef, passwordInputRef];

  const handleInput = () => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input?.current?.validity.valid),
    );
  };

  // submit handlers
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (inputs.every((input) => input?.current?.validity.valid)) {
      onRegister({
        email: emailInputRef?.current?.value as string,
        password: passwordInputRef?.current?.value as string,
        name: nameInputRef?.current?.value as string,
      });
    }
  };

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate>
      <FieldWrapper
        className={cn('field-wrapper')}
        fieldClassName={cn('field')}
        errorMessageClassName={cn('error-message')}
        label={texts.nameInput.label}
        name="nameInput"
        minLength={2}
        required
        ref={nameInputRef}
        onInput={handleInput}
      />

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
        {texts.submitButton}
      </Button>
    </Form>
  );
};

export default RegisterForm;
