import {createCn} from 'bem-react-classname';
import React from 'react';
import Button from '../Button/Button';
import Field from '../Field/Field';
import Form, {FormProps} from '../Form/Form';
import {profile} from '../../utils/texts';

import './ProfileForm.css';

const texts = profile.form;

export interface UserData {
  email: string;
  name: string;
}

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
  const cn = createCn('profile-form', className);

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = React.useState(
    true,
  );
  const [isNameValid, setNameValid] = React.useState(false);
  const [isEmailValid, setEmailValid] = React.useState(false);

  const nameInputRef = React.createRef<HTMLInputElement>();
  const emailInputRef = React.createRef<HTMLInputElement>();

  const inputs = [nameInputRef, emailInputRef];

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
      <div className={cn('container')}>
        <label className={cn('label')}>{texts.nameInput.label}</label>
        <Field
          minLength={2}
          required
          ref={nameInputRef}
          onInput={handleNameInput}
          isError={!isNameValid}
        />
      </div>
      <div className={cn('container')}>
        <label className={cn('label')}>{texts.emailInput.label}</label>
        <Field
          type="email"
          required
          ref={emailInputRef}
          onInput={handleEmailInput}
          isError={!isEmailValid}
        />
      </div>

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