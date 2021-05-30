import {createCn} from 'bem-react-classname';
import React from 'react';
import {Theme} from '../../utils/types';
import Button from '../Button/Button';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import Form, {FormProps} from '../Form/Form';
import {login} from '../../utils/texts';

import './LoginForm.css';

const texts = login.form;

/** Тип возвращаемых данных  */
export interface UserData {
  email: string;
  password: string;
}

/** Тип callback функции */
export interface LoginFunc {
  (userData: UserData): void;
}

export interface LoginFormProps extends FormProps {
  /** callback, вызываемый при отправке формы */
  onLogin: LoginFunc;
}

/** Форма входа в аккаунт */
const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onLogin,
  ...props
}) => {
  const cn = createCn('login-form', className);

  /** Переменная-флаг для отключения кнопки отправки формы */
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );

  /** Ссылки на input-элементы */
  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();

  /** Список всех ссылок */
  const inputs = [emailInputRef, passwordInputRef];

  /** Handlers */
  const handleInput = () => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input?.current?.validity.valid),
    );
  };

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
        {/** Поле с Email */}
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

        {/** Поле с паролем */}
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

      {/** Кнопка отправки формы */}
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
