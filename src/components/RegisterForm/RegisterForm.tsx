import {createCn} from 'bem-react-classname';
import React from 'react';

import Button from '../Button/Button';
import FieldWrapper from '../FieldWrapper/FieldWrapper';
import Form, {FormProps} from '../Form/Form';
import {register} from '../../utils/texts';
import {Theme} from '../../utils/types';

import './RegisterForm.css';

const texts = register.form;

/** Возвращаемые формой данные */
export interface UserData {
  email: string;
  password: string;
  name: string;
}

/** callback функция при отправке формы */
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

  /** Переменная-флаг для отключения кнопки отправки формы */
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );

  /** Ссылки на input-элементы */
  const nameInputRef = React.createRef<HTMLInputElement>();
  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();

  /** Список всех ссылок */
  const inputs = [nameInputRef, emailInputRef, passwordInputRef];

  /** Handlers */
  const handleInput = () => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input?.current?.validity.valid),
    );
  };

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
      <fieldset className={cn('fieldset')}>
        {/** Поле с именем */}
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

export default RegisterForm;
