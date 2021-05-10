import classNames from 'classnames';
import PushButton from '../PushButton/PushButton';

import './HamburgButton.css';

function HamburgButton(props) {
  const className = classNames('hamburg-button', props.className);

  return <PushButton {...props} className={className} />;
}

export default HamburgButton;
