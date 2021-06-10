import {createCn} from 'bem-react-classname';
import React from 'react';

import Button from '@generic/Button/Button';
import Field from '@generic/Field/Field';
import Form, {FormProps} from '@generic/Form/Form';
import {profile} from '@utils/texts';
import CurrentUserContext from '@contexts/CurrentUserContext';
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import {useFormWithValidation} from '@utils/hooks';
import {ProfileUserData} from 'types/User';
import {ApiCallback} from 'types/types';

import './ProfileForm.css';

const texts = profile.form;

/** callback функция, вызываемая при обновлении профиля */
export type ProfileUpdateFunc = ApiCallback<ProfileUserData>;

export interface ProfileFormProps extends FormProps {
  onProfileUpdate: ProfileUpdateFunc;
}

const ProfileForm: React.FC<ProfileFormProps> = ({className, onProfileUpdate, ...props}) => {
  const cn = createCn('profile-form', className);
  const currentUser = React.useContext(CurrentUserContext);

  enum Fields {
    nameInput,
    emailInput,
  }

  const {
    values, handleChange, errors, fieldsValidity, isValid,
  } = useFormWithValidation<typeof Fields>();

  const [APIError, setAPIError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(isValid);

  // ----------------------------------------------
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isFormValid) {
      setIsProcessing(true);
      onProfileUpdate({
        name: values.nameInput as string,
        email: values.emailInput as string,
      })
        .catch(setAPIError)
        .finally(() => setIsProcessing(false));
    }
  };

  console.log('change');

  const isChanged = () => currentUser.name !== values.nameInput
  || currentUser.email !== values.emailInput;

  // ----------------------------------------------
  React.useEffect(() => {
    setIsFormValid(isValid && isChanged());
  }, [isValid]);

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
              defaultValue={currentUser.name}
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
              type="email"
              isError={!fieldsValidity.emailInput}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.emailInput}</ErrorMessage>
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <ErrorMessage className={cn('submit-error')}>{APIError}</ErrorMessage>
      <Button className={cn('submit-button')} type="submit" disabled={!isFormValid}>
        {isProcessing ? texts.submitButton.loadingText : texts.submitButton.text}
      </Button>
    </Form>
  );
};

export default ProfileForm;
