import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import {getAmountSettings} from '@utils/device-type';
/* ---------------------------------- Types --------------------------------- */
import {
  AmountDeviceSettings,
  DeviceWidthSettings,
} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ExpandableListSettings {
  startCount: number;
  step: number;
  deviceSettings: DeviceWidthSettings;
  countSettings: AmountDeviceSettings;
}

export type ValueType<T> = T[] | undefined;
export type SetValueFunc<T> = Dispatch<
  SetStateAction<T[] | undefined>
>;
export type ExpandFunc = () => void;
export type ResetFunc = () => void;

export interface ReturnType<T> {
  value: ValueType<T>;
  setValue: SetValueFunc<T>;
  isComplete: boolean;
  expand: ExpandFunc;
  reset: ResetFunc;
}

export function useExpandableList<T>(
  {deviceSettings, countSettings}: ExpandableListSettings,
  initVal?: T[],
): ReturnType<T> {
  /* -------------------------------- Internal -------------------------------- */
  const getCurrentSettings = () => getAmountSettings(deviceSettings, countSettings);

  /* --------------------------------- States --------------------------------- */
  const [value, setValue] = useState<T[] | undefined>(initVal);
  const [storedValue, setStoredValue] = useState<T[] | undefined>(initVal);
  const [currentCount, setCurrentCount] = useState(
    getCurrentSettings().startCount,
  );
  const [step, setStep] = useState(
    getCurrentSettings().step,
  );
  const [isComplete, setIsComplete] = useState(true);

  /* --------------------------- Exported Functions --------------------------- */
  const expand = useCallback(() => {
    const newCount = currentCount + step;
    setCurrentCount(newCount);
  }, [currentCount, step, setCurrentCount]);

  const reset = useCallback(() => {
    setCurrentCount(getCurrentSettings().startCount);
  }, [setCurrentCount]);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    function handleResize() {
      setStep(getCurrentSettings().step);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setStep]);

  useEffect(() => {
    /** Выравнивание при изменении шага */
    if (!isComplete && currentCount % step !== 0) {
      setCurrentCount(
        currentCount + step - (currentCount % step),
      );
    }
  }, [step]);

  useEffect(() => {
    function trimList() {
      setValue(storedValue?.slice(0, currentCount));
    }

    function updateCompleteState() {
      setIsComplete(
        (storedValue
          && storedValue.length <= currentCount)
          ?? true,
      );
    }

    trimList();
    updateCompleteState();
  }, [currentCount, storedValue]);

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
