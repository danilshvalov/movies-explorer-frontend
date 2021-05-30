import {createCn} from 'bem-react-classname';
import React from 'react';
import Button from '../Button/Button';
import Field from '../Field/Field';
import Form, {FormProps} from '../Form/Form';
import {profile} from '../../utils/texts';

import './ProfileForm.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const texts = profile.form;

/** Возвращаемые формой данные */
export interface UserData {
  email: string;
  name: string;
}

/** callback функция, вызываемая при обновлении профиля */
export interface ProfileUpdateFunc {
  (userData: UserData): void;
}

export interface ProfileFormProps extends FormProps {
  onProfileUpdate: ProfileUpdateFunc;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  className,
  onProfileUpdate,
  ...props
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const cn = createCn('profile-form', className);

  /** Переменная-флаг для отключения кнопки отправки формы */
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );
  /**
   * Флаги валидности данных. По умолчанию TRUE, чтобы ошибка была видна
   *  только при вводе/попытке отправить некорректные данные
   * */
  const [isNameValid, setNameValid] = React.useState(true);
  const [isEmailValid, setEmailValid] = React.useState(true);

  /** Ссылки на input-элементы */
  const nameInputRef = React.createRef<HTMLInputElement>();
  const emailInputRef = React.createRef<HTMLInputElement>();

  const inputs = [nameInputRef, emailInputRef];

  /** Handlers */
  const handleNameInput = () => setNameValid(nameInputRef.current?.validity.valid as boolean);
  const handleEmailInput = () => setEmailValid(emailInputRef.current?.validity.valid as boolean);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (inputs.every((input) => input.current?.validity.valid)) {
      onProfileUpdate({
        name: nameInputRef.current?.value as string,
        email: emailInputRef.current?.value as string,
      });
    }
  };

  React.useEffect(() => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input.current?.validity.valid),
    );
  }, [inputs]);

  return (
    <Form {...props} className={cn()} onSubmit={handleSubmit} noValidate>
      <fieldset className={cn('fieldset')}>
        {/** Поле с Email */}
        <div className={cn('field-container')}>
          <label className={cn('label')}>{texts.nameInput.label}</label>
          <Field
            className={cn('field')}
            minLength={2}
            required
            ref={nameInputRef}
            onInput={handleNameInput}
            isError={!isNameValid}
            defaultValue={currentUser.name}
          />
        </div>
        {/** Поле с именем */}
        <div className={cn('field-container')}>
          <label className={cn('label')}>{texts.emailInput.label}</label>
          <Field
            className={cn('field')}
            type="email"
            required
            ref={emailInputRef}
            onInput={handleEmailInput}
            isError={!isEmailValid}
            defaultValue={currentUser.email}
          />
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={isSubmitButtonDisabled}
      >
        {texts.submitButton}
      </Button>
    </Form>
  );
};

export default ProfileForm;
