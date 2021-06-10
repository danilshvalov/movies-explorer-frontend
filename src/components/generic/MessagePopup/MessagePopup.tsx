import {createCn} from 'bem-react-classname';
import React from 'react';
import CloseButton from '@CloseButton/CloseButton';

import './MessagePopup.css';

// TODO сделать что-то с этим чудом
function MessagePopup(props: React.HTMLAttributes<HTMLDivElement>) {
  const cn = createCn('message-popup', props.className);

  return (
    <div className={cn()}>
      <CloseButton className={cn('close-button')} />
      {props.children}
    </div>
  );
}

export default MessagePopup;
