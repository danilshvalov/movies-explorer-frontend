import {createCn} from 'bem-react-classname';
import React, {useContext, useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import * as GenericForm from '@generic/Form/Form';
import Button from '@generic/Button/Button';
import Field from '@generic/Field/Field';
import PreloaderWrapper from '@generic/PreloaderWrapper/PreloaderWrapper';
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
export function ProfileForm({
  className,
  onProfileUpdate,
  ...props
}: Props): JSX.Element {
  const cn = createCn('profile-form', className);
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    setValues,
    isFieldValid,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation({
    nameInput: currentUser.name,
    emailInput: currentUser.email,
  });

  useEffect(() => {
    setValues({nameInput: currentUser.name, emailInput: currentUser.email});
  }, [currentUser]);

  // TODO API error работает???
  const [APIError, setAPIError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  /**
   * HTML-текст, появляющийся при наведении на кнопку submit
   *
   * @see {@link http://htmlbook.ru/html/attr/title}
   */
  const [hoverButtonText, setHoverButtonText] = useState('');

  /* -------------------------------------------------------------------------- */
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const nameValue = values.nameInput;
    const emailValue = values.emailInput;

    if (isFormValid && nameValue && emailValue) {
      setIsProcessing(true);
      onProfileUpdate({
        name: nameValue,
        email: emailValue,
      })
        .catch(setAPIError)
        .finally(() => setIsProcessing(false));
    }
  };

  useEffect(() => {
    function checkIsChanged(): boolean {
      const nameValue = values.nameInput;
      const emailValue = values.emailInput;
      const {name, email} = currentUser;
      return name !== nameValue || email !== emailValue;
    }

    const isChanged = checkIsChanged();

    if (!isChanged) {
      setHoverButtonText('Вы ничего не изменили. Сохранение не требуется');
    } else {
      setHoverButtonText('');
    }

    setIsFormValid(isValid && isChanged);
  }, [values]);

  // ----------------------------------------------

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <PreloaderWrapper isLoading={isLoading}>
      <GenericForm.Form
        {...props}
        className={cn()}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className={cn('fieldset')}>
          {/** Поле с именем */}
          <div className={cn('container')}>
            <div className={cn('field-wrapper')}>
              <label className={cn('label')}>{texts.nameInput.label}</label>
              <Field
                className={cn('field')}
                name={'nameInput'}
                onChange={handleChange}
                minLength={2}
                isError={!isFieldValid('nameInput')}
                required
                defaultValue={values.nameInput}
              />
            </div>
            <ErrorMessage className={cn('field-error')}>
              {errors.nameInput}
            </ErrorMessage>
          </div>

          {/** Поле с Email */}
          <div className={cn('container')}>
            <div className={cn('field-wrapper')}>
              <label className={cn('label')}>{texts.emailInput.label}</label>
              <Field
                className={cn('field')}
                name={'emailInput'}
                onChange={handleChange}
                type="email"
                isError={!isFieldValid('emailInput')}
                required
                defaultValue={values.emailInput}
              />
            </div>
            <ErrorMessage className={cn('field-error')}>
              {errors.emailInput}
            </ErrorMessage>
          </div>
        </fieldset>

        {/** Кнопка отправки формы */}
        <ErrorMessage className={cn('submit-error')}>{APIError}</ErrorMessage>
        <Button
          className={cn('submit-button')}
          type="submit"
          disabled={!isFormValid}
          title={hoverButtonText}
        >
          {
            isProcessing
              ? texts.submitButton.loadingText
              : texts.submitButton.text
          }
        </Button>
      </GenericForm.Form>
    </PreloaderWrapper>
  );
}

export default ProfileForm;
