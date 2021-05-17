import {createCn} from 'bem-react-classname';
import React from 'react';
import PushButton from '../PushButton/PushButton';
import './SubmitButton.css';

const SubmitButton = React.memo((props) => {
  const {isDisabled} = props;
  const cn = createCn('submit-button', props.className);

  return (
    <PushButton {...props} className={cn({disabled: isDisabled})} type="submit">
      {props.children}
    </PushButton>
  );
});

export default SubmitButton;
