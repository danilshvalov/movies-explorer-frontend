import {
  useCallback, useEffect, useState, ChangeEvent, Dispatch, SetStateAction,
} from 'react';
import getDeviceType from '@utils/device-type';
import {AmountDeviceSettings, DeviceWidthSettings} from 'types/types';

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {target} = evt;
    const {value} = target;
    const {name} = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    handleChange,
    setValues,
  };
}

// хук управления формой и валидации формы
export function useFormWithValidation<T extends {[key: number]: any}>() {
  type Fields = {
    [K in keyof T]?: string;
  };
  const [values, setValues] = useState<Fields>({});
  const [errors, setErrors] = useState<Fields>({});
  const [fieldsValidity, setFieldsValidity] = useState<Fields>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
    handleChange,
    errors,
    fieldsValidity,
    isValid,
    resetForm,
  };
}

export function useLocalStorage<T>(
  key: string,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T | undefined>();

  // const item = window.localStorage.getItem(key);
  // return item ? JSON.parse(item) : null;

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export interface ExpandableListSettings {
  startCount: number;
  deviceSettings: DeviceWidthSettings;
  countSettings: AmountDeviceSettings;
}

export function useExpandableList<T>(
  {startCount, deviceSettings, countSettings}: ExpandableListSettings,
  initVal?: T[],
) {
  const [value, setValue] = useState<T[] | undefined>(initVal);
  const [storedValue, setStoredValue] = useState<T[] | undefined>(initVal);
  const [currentCount, setCurrentCount] = useState(startCount);
  const [step, setStep] = useState(startCount);
  const [isComplete, setIsComplete] = useState(true);

  const getAlignedCount = () => currentCount + step - (currentCount % step);
  // ----------------------------------------------

  /** exported func */
  const expand = useCallback(() => {
    console.log('expand by: ', step);
    const newCount = getAlignedCount();
    setValue(storedValue?.slice(0, newCount));
    setCurrentCount(newCount);
  }, [setValue, storedValue, getAlignedCount]);

  const reset = useCallback(() => {
    setCurrentCount(step);
  }, [setCurrentCount]);
  // ----------------------------------------------

  /** Effects */
  useEffect(() => {
    const handleResize = () => {
      setStep(countSettings[getDeviceType(deviceSettings)].step);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (storedValue && currentCount < storedValue.length) {
      expand();
    }
  }, [step]);

  useEffect(() => {
    setValue(storedValue?.slice(0, currentCount));
  }, [currentCount, storedValue]);

  useEffect(() => {
    setIsComplete((storedValue && currentCount >= storedValue.length) as boolean);
  }, [currentCount]);

  useEffect(() => {
    reset();
  }, [storedValue]);
  // ----------------------------------------------

  return {
    value,
    setValue: setStoredValue,
    expand,
    reset,
    isComplete,
  };
}

export function useCombineState<T>(init: T) {
  const [state, setState] = useState<T>(init);

  function updateState(key: keyof T, value: typeof state[typeof key]) {
    setState({
      ...state,
      key: value,
    });
  }

  return {state, setState, updateState};
}
