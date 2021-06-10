import {createCn} from 'bem-react-classname';
import {FormEvent, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
import Field from '@generic/Field/Field';
import * as GenericForm from '@generic/Form/Form';
/* ---------------------------------- Hooks --------------------------------- */
import useFormWithValidation from '@hooks/UseFormWithValidation';
/* ---------------------------------- Utils --------------------------------- */
import {register} from '@utils/texts';
/* ---------------------------------- Types --------------------------------- */
import {OnRegisterFunc, Theme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './RegisterForm.css';

const texts = register.form;

export type DOMProps = GenericForm.DOMProps;
export interface FunctionalProps {
  onRegister: OnRegisterFunc;
}
export type Props = DOMProps & FunctionalProps;

export function RegisterForm({onRegister, ...props}: Props): JSX.Element {
  const cn = createCn('register-form', props.className);

  enum Fields {
    nameInput,
    emailInput,
    passwordInput,
  }

  const {
    values, handleChange, errors, fieldsValidity, isValid,
  } = useFormWithValidation<typeof Fields>();

  const [APIError, setAPIError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      setIsProcessing(true);
      onRegister({
        name: values.nameInput as string,
        email: values.emailInput as string,
        password: values.passwordInput as string,
      })
        .catch(setAPIError)
        .finally(() => setIsProcessing(false));
    }
  };

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
              isError={!fieldsValidity.nameInput}
              required
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
              isError={!fieldsValidity.emailInput}
              type="email"
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.emailInput}</ErrorMessage>
        </div>

        {/** Поле с паролем */}
        <div className={cn('container')}>
          <div className={cn('field-wrapper')}>
            <label className={cn('label')}>{texts.passwordInput.label}</label>
            <Field
              className={cn('field')}
              name={Fields[Fields.passwordInput]}
              onChange={handleChange}
              minLength={8}
              isError={!fieldsValidity.passwordInput}
              type="password"
              required
            />
          </div>
          <ErrorMessage className={cn('field-error')}>{errors.passwordInput}</ErrorMessage>
        </div>
      </fieldset>

      {/** Кнопка отправки формы */}
      <ErrorMessage className={cn('submit-error')}>{APIError}</ErrorMessage>
      <Button className={cn('submit-button')} type="submit" disabled={isValid} theme={Theme.Azure}>
        {isProcessing ? texts.submitButton.loadingText : texts.submitButton.text}
      </Button>
    </GenericForm.Form>
  );
}

export default RegisterForm;
