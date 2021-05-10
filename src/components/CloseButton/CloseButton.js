import classNames from 'classnames';
import PushButton from '../PushButton/PushButton';

import './CloseButton.css';

function CloseButton(props) {
  const className = classNames('close-button', props.className);
  return <PushButton {...props} className={className} />;
}

export default CloseButton;
