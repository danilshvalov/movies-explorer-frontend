import {createCn} from 'bem-react-classname';
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
/* --------------------------------- Generics -------------------------------- */
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import * as GenericForm from '@generic/Form/Form';
import Button from '@generic/Button/Button';
import Field from '@generic/Field/Field';
import FieldWrapper from '@generic/FieldWrapper/FieldWrapper';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
/* ---------------------------------- Utils --------------------------------- */
import {PROFILE} from '@texts/product';
/* ---------------------------------- Types --------------------------------- */
import {OnProfileUpdateFunc} from 'types/functional';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* -------------------------------------------------------------------------- */
import './ProfileForm.css';

const TEXTS = PROFILE.form;

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

  const [APIError, setAPIError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [submitButtonText, setSubmitButtonText] = useState(
    TEXTS.submitButton.text,
  );

  /**
   * HTML-текст, появляющийся при наведении на кнопку submit
   *
   * @see {@link http://htmlbook.ru/html/attr/title}
   */
  const [hoverButtonText, setHoverButtonText] = useState('');

  /* -------------------------------- Handlers -------------------------------- */

  function handleInputChange(
    evt: ChangeEvent<HTMLInputElement>,
  ) {
    handleChange(evt);
    setSubmitButtonText(TEXTS.submitButton.text);
  }

  function handlePreSubmit() {
    setIsProcessing(true);
    setSubmitButtonText(TEXTS.submitButton.loadingText);
  }

  function handleSuccessUpdate() {
    setSubmitButtonText(TEXTS.submitButton.afterChangeText);
  }

  function handleProcessFinalization() {
    setIsProcessing(false);
  }

  function handleAPIError(err: Error) {
    setSubmitButtonText(TEXTS.submitButton.text);
    setAPIError(err.message);
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const nameValue = values.nameInput;
    const emailValue = values.emailInput;

    if (isFormValid && nameValue && emailValue) {
      handlePreSubmit();
      onProfileUpdate({
        name: nameValue,
        email: emailValue,
      })
        .then(handleSuccessUpdate)
        .catch(handleAPIError)
        .finally(handleProcessFinalization);
    }
  };

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    function checkIsChanged(): boolean {
      const nameValue = values.nameInput;
      const emailValue = values.emailInput;
      const {name, email} = currentUser;
      return name !== nameValue || email !== emailValue;
    }

    const isChanged = checkIsChanged();

    /**
     * Если пользователь хочет отправить форму, но данные остались прежними,
     * при наведении на кнопку появляется надпись, информирующая пользователя о том,
     * почему кнопка находится в заблокированном состоянии
     */
    if (!isChanged) {
      setHoverButtonText(TEXTS.submitButton.hoverErrorText);
    } else {
      setHoverButtonText('');
    }

    setIsFormValid(isValid && isChanged);
  }, [values]);

  useEffect(() => {
    setValues({
      nameInput: currentUser.name ?? '',
      emailInput: currentUser.email ?? '',
    });
  }, [currentUser]);

  /* -------------------------------------------------------------------------- */

  return (
    <GenericForm.Form
      {...props}
      className={cn()}
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className={cn('fieldset')}>
        {/** Поле с именем */}
        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>
              {TEXTS.nameInput.label}
            </label>
            <Field
              className={cn('field')}
              name={'nameInput'}
              onChange={handleInputChange}
              minLength={2}
              isError={!isFieldValid('nameInput')}
              disabled={isProcessing}
              required
              defaultValue={values.nameInput || ''}
            />
          </FieldWrapper>
          <ErrorMessage className={cn('field-error')}>
            {errors.nameInput}
          </ErrorMessage>
        </div>

        {/** Поле с Email */}
        <div className={cn('container')}>
          <FieldWrapper className={cn('field-wrapper')}>
            <label className={cn('label')}>
              {TEXTS.emailInput.label}
            </label>
            <Field
              className={cn('field')}
              name={'emailInput'}
              onChange={handleInputChange}
              type="email"
              isError={!isFieldValid('emailInput')}
              required
              disabled={isProcessing}
              defaultValue={values.emailInput || ''}
            />
          </FieldWrapper>
          <ErrorMessage className={cn('field-error')}>
            {errors.emailInput}
          </ErrorMessage>
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <ErrorMessage className={cn('submit-error')}>
        {APIError}
      </ErrorMessage>
      <Button
        className={cn('submit-button')}
        type="submit"
        disabled={!isFormValid || isProcessing}
        title={hoverButtonText}
      >
        {submitButtonText}
      </Button>
    </GenericForm.Form>
  );
}

export default ProfileForm;
