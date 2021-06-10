import {createCn} from 'bem-react-classname';
import React from 'react';
/* --------------------------------- Generics -------------------------------- */
import CloseButton from '@generic/CloseButton/CloseButton';
/* -------------------------------------------------------------------------- */
import './MessagePopup.css';

// TODO сделать что-то с этим чудом
export function MessagePopup(props: React.HTMLAttributes<HTMLDivElement>) {
  const cn = createCn('message-popup', props.className);

  return (
    <div className={cn()}>
      <CloseButton className={cn('close-button')} />
      {props.children}
    </div>
  );
}

export default MessagePopup;
