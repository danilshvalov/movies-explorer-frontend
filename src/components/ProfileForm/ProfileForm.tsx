import {createCn} from 'bem-react-classname';
import React from 'react';
import Button from '../Button/Button';
import Form, {FormProps} from '../Form/Form';
import {profile} from '../../utils/texts';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import FieldWrapper from '../FieldWrapper/FieldWrapper';

import './ProfileForm.css';

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
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(true);
  /**
   * Флаги валидности данных. По умолчанию TRUE, чтобы ошибка была видна
   *  только при вводе/попытке отправить некорректные данные
   * */

  /** Ссылки на input-элементы */
  const nameInputRef = React.createRef<HTMLInputElement>();
  const emailInputRef = React.createRef<HTMLInputElement>();

  const inputs = [nameInputRef, emailInputRef];

  const handleInput = () => {
    setSubmitButtonDisabled(
      inputs.some((input) => !input?.current?.validity.valid),
    );
  };

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
        {/** Поле с именем */}
        <FieldWrapper
          className={cn('field-wrapper')}
          label={texts.nameInput.label}
          labelClassName={cn('label')}
          fieldClassName={cn('field')}
          errorMessageClassName={cn('error-message')}
          name="nameInput"
          minLength={2}
          required
          ref={nameInputRef}
          onInput={handleInput}
          defaultValue={currentUser.name}
        />

        {/** Поле с Email */}
        <FieldWrapper
          className={cn('field-wrapper')}
          label={texts.emailInput.label}
          labelClassName={cn('label')}
          fieldClassName={cn('field')}
          errorMessageClassName={cn('error-message')}
          name="emailInput"
          type="email"
          required
          ref={emailInputRef}
          onInput={handleInput}
          defaultValue={currentUser.email}
        />
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
