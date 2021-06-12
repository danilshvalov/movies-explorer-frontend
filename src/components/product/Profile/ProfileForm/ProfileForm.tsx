import {createCn} from 'bem-react-classname';
import React from 'react';
/* --------------------------------- Generic -------------------------------- */
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import * as GenericForm from '@generic/Form/Form';
import Button from '@generic/Button/Button';
import Field from '@generic/Field/Field';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
/* ---------------------------------- Utils --------------------------------- */
import {profile} from '@utils/texts';
/* ---------------------------------- Types --------------------------------- */
import {OnProfileUpdateFunc} from 'types/types';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* -------------------------------------------------------------------------- */
import './ProfileForm.css';

const texts = profile.form;

export type DOMProps = GenericForm.DOMProps;
export interface FunctionalProps {
  onProfileUpdate: OnProfileUpdateFunc;
}

export type Props = DOMProps & FunctionalProps;
export function ProfileForm({className, onProfileUpdate, ...props}: Props): JSX.Element {
  const cn = createCn('profile-form', className);
  const currentUser = React.useContext(CurrentUserContext);

  enum Fields {
    nameInput,
    emailInput,
  }

  const {
    values, handleChange, errors, isValid, isFieldValid,
  } = useFormWithValidation<
    typeof Fields
  >({nameInput: currentUser.name, emailInput: currentUser.email});

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

  function isChanged() {
    console.log(currentUser.name !== values.nameInput || currentUser.email !== values.emailInput);
    return currentUser.name !== values.nameInput || currentUser.email !== values.emailInput;
  }

  // ----------------------------------------------
  React.useEffect(() => {
    setIsFormValid(isValid && isChanged());
  }, [isValid, values]);

  return (
    <GenericForm.Form {...props} className={cn()} onSubmit={handleSubmit} noValidate>
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
              isError={!isFieldValid('nameInput')}
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
              isError={!isFieldValid('emailInput')}
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
    </GenericForm.Form>
  );
}

export default ProfileForm;
