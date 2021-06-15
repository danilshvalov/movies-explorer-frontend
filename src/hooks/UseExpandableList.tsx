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
import {
  AmountDeviceSettings,
  DeviceWidthSettings,
} from 'types/types';
/* -------------------------------------------------------------------------- */

export interface ExpandableListSettings {
  startCount: number;
  deviceSettings: DeviceWidthSettings;
  countSettings: AmountDeviceSettings;
}

export type ValueType<T> = T[] | undefined;
export type SetValueFunc<T> = Dispatch<SetStateAction<T[] | undefined>>;
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
  {
    startCount,
    deviceSettings,
    countSettings,
  }: ExpandableListSettings,
  initVal?: T[],
): ReturnType<T> {
  const [value, setValue] = useState<T[] | undefined>(initVal);
  const [storedValue, setStoredValue] = useState<T[] | undefined>(initVal);
  const [currentCount, setCurrentCount] = useState(startCount);
  const [step, setStep] = useState(startCount);
  const [isComplete, setIsComplete] = useState(true);

  /* -------------------------------- Internal -------------------------------- */
  const getAlignedCount = () => currentCount + step - (currentCount % step);

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
    function handleResize() {
      setStep(
        countSettings[getDeviceType(deviceSettings)].step,
      );
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /** Выравнивание при изменении шага */
  useEffect(() => {
    function handleStepChange() {
      if (!isComplete) {
        expand();
      }
    }
    handleStepChange();
  }, [step, isComplete]);

  useEffect(() => {
    function trimList() {
      setValue(storedValue?.slice(0, currentCount));
    }

    function updateCompleteState() {
      setIsComplete(
        (storedValue && storedValue.length <= currentCount)
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
