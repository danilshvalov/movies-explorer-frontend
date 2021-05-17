import {createCn} from 'bem-react-classname';
import React from 'react';
import CloseButton from '../CloseButton/CloseButton';

import './Popup.css';

function Popup(props: React.HTMLAttributes<HTMLDivElement>) {
  const cn = createCn('popup', props.className);

  return (
    <div className={cn()}>
      <CloseButton className={cn('close-button')} />
      {props.children}
    </div>
  );
}

export default Popup;
