import {
  ChangeEvent,
  useCallback,
  useState,
} from 'react';

type Fields<T> = {
  [K in keyof T]?: string;
};

type OnChangeFunc = (evt: ChangeEvent<HTMLInputElement>) => void;

export interface ReturnType<T> {
  values: Fields<T>;
  errors: Fields<T>;
  isValid: boolean;
  handleChange: OnChangeFunc;
  resetForm: () => void;
  isFieldValid: <K extends keyof T>(key: K) => boolean;
}

export function useFormWithValidation<T extends
 {[key: number]: string}>(initValues?: Fields<T>): ReturnType<T> {
  const [values, setValues] = useState<Fields<T>>(initValues || {});
  const [errors, setErrors] = useState<Fields<T>>({});
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

  const isFieldValid = useCallback(
    <K extends keyof T>(key: K) => {
      if (errors[key]) {
        return errors[key] === '';
      }
      return true;
    },
    [errors],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    isFieldValid,
  };
}

export default useFormWithValidation;
