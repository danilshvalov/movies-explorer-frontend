import {createCn} from 'bem-react-classname';
import Button, {IButtonProps} from '../Button/Button';

import './CloseButton.css';

function CloseButton(props: IButtonProps) {
  const cn = createCn('close-button', props.className);
  return <Button {...props} className={cn()} />;
}

export default CloseButton;
