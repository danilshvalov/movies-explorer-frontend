import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useCallback,
  useState,
} from 'react';

export type Fields<T> = {
  [K in keyof T]?: string;
};

type ObjectType = {
  [key: string]: string | undefined;
};

export type OnChangeFunc = (evt: ChangeEvent<HTMLInputElement>) => void;
export type ResetFunc = () => void;
export type ValidCheckFunc<T> = <K extends keyof T>(key: K) => boolean;

export interface ReturnType<T> {
  /** Текущие значения полей */
  values: Fields<T>;
  /** Обновление текущих значений полей */
  setValues: Dispatch<SetStateAction<Fields<T>>>;
  /** Ошибки полей */
  errors: Fields<T>;
  /** Валидность всей формы */
  isValid: boolean;
  /**
   * Callback события изменения поля
   *
   * @requires
   * Обязательна установка этого обработчика на все поля формы
   */
  handleChange: OnChangeFunc;
  /** Сброс всего */
  resetForm: ResetFunc;
  /** Проверка валидности поля по имени */
  isFieldValid: ValidCheckFunc<T>;
}

/**
 * Hook формы с валидацией
 * @see ReturnType
 */
export function useFormWithValidation<T extends ObjectType>(
  initValues?: T,
): ReturnType<T> {
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
    setValues,
    errors,
    isValid,
    handleChange,
    resetForm,
    isFieldValid,
  };
}

export default useFormWithValidation;
