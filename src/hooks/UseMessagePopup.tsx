import useKey from '@rooks/use-key';
import {useCallback, useState} from 'react';

export type OpenFunc = (msg: string) => void;
export type CloseFunc = () => void;

export interface ResultType {
  isOpen: boolean;
  open: OpenFunc;
  close: CloseFunc;
  message: string;
}

export function useMessagePopup(): ResultType {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  function handleEscape() {
    setIsOpen(false);
  }

  const open: OpenFunc = useCallback(
    (msg: string) => {
      setMessage(msg);
      setIsOpen(true);
    },
    [setIsOpen, setMessage],
  );

  const close: CloseFunc = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useKey(['Escape'], handleEscape, {when: isOpen});

  return {
    isOpen,
    open,
    close,
    message,
  };
}

export default useMessagePopup;
