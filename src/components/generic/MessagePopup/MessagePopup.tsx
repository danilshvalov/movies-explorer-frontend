import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* --------------------------------- Generics -------------------------------- */
import CloseButton from '@generic/CloseButton/CloseButton';
/* -------------------------------------------------------------------------- */
import './MessagePopup.css';

export interface FunctionalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}
export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = FunctionalProps & DOMProps;

/**
 * Всплывающее сообщение
 */
export function MessagePopup(props: Props): JSX.Element {
  const cn = createCn('message-popup', props.className);

  return (
    <div {...filterInvalidDOMProps(props)} className={cn({opened: props.isOpen})}>
      <CloseButton className={cn('close-button')} onClick={props.onClose} />
      <p className={cn('message')}> {props.message}</p>
    </div>
  );
}

export default MessagePopup;
