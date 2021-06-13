import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import getDeviceType from '@utils/device-type';
/* ---------------------------------- Types --------------------------------- */
import {AmountDeviceSettings, DeviceWidthSettings} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ExpandableListSettings {
  startCount: number;
  deviceSettings: DeviceWidthSettings;
  countSettings: AmountDeviceSettings;
}

export interface ReturnType<T> {
  value: T[] | undefined;
  setValue: Dispatch<SetStateAction<T[] | undefined>>;
  isComplete: boolean;
  expand: () => void;
  reset: () => void;
}

export function useExpandableList<T>(
  {startCount, deviceSettings, countSettings}: ExpandableListSettings,
  initVal?: T[],
): ReturnType<T> {
  const [value, setValue] = useState<T[] | undefined>(initVal);
  const [storedValue, setStoredValue] = useState<T[] | undefined>(initVal);
  const [currentCount, setCurrentCount] = useState(startCount);
  const [step, setStep] = useState(startCount);
  const [isComplete, setIsComplete] = useState(true);

  const getAlignedCount = () => currentCount + step - (currentCount % step);
  /* -------------------------------------------------------------------------- */

  /* --------------------------- Exported Functions --------------------------- */
  const expand = useCallback(() => {
    const newCount = getAlignedCount();
    setValue(storedValue?.slice(0, newCount));
    setCurrentCount(newCount);
  }, [setValue, storedValue, getAlignedCount]);

  const reset = useCallback(() => {
    setCurrentCount(step);
  }, [setCurrentCount]);

  /* --------------------------------- Effects -------------------------------- */
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
    setIsComplete(
      (storedValue && currentCount >= storedValue.length) as boolean,
    );
  }, [currentCount]);

  useEffect(() => {
    reset();
  }, [storedValue]);
  /* -------------------------------------------------------------------------- */

  return {
    value,
    setValue: setStoredValue,
    isComplete,
    expand,
    reset,
  };
}

export default useExpandableList;
