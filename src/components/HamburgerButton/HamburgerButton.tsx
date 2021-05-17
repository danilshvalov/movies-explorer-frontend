import {createCn} from 'bem-react-classname';
import Button, {IButtonProps} from '../Button/Button';

import './HamburgerButton.css';

function HamburgerButton(props: IButtonProps) {
  const cn = createCn('hamburger-button', props.className);

  return <Button {...props} className={cn()} />;
}

export default HamburgerButton;
