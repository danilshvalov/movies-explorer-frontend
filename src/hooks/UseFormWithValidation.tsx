import {ChangeEvent, useCallback, useState} from 'react';

type Fields<T> = {
  [K in keyof T]?: string;
};

type OnChangeFunc = (evt: ChangeEvent<HTMLInputElement>) => void;

export interface ReturnType<T> {
  values: Fields<T>;
  errors: Fields<T>;
  fieldsValidity: Fields<T>;
  isValid: boolean;
  handleChange: OnChangeFunc;
  resetForm: () => void;
}

export function useFormWithValidation<T extends {[key: number]: string}>(): ReturnType<T> {
  const [values, setValues] = useState<Fields<T>>({});
  const [errors, setErrors] = useState<Fields<T>>({});
  const [fieldsValidity, setFieldsValidity] = useState<Fields<T>>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange: OnChangeFunc = (evt) => {
    const {target} = evt;
    const {name} = target;
    const {value} = target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });
    setFieldsValidity({
      ...fieldsValidity,
      [name]: target.validity,
    });
    setIsValid(target.closest('form')?.checkValidity() as boolean);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    errors,
    fieldsValidity,
    isValid,
    handleChange,
    resetForm,
  };
}

export default useFormWithValidation;
