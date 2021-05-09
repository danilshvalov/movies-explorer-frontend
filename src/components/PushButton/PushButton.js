import {getOnlyDOMProps, concatClassNames} from '../../utils/utils';
import Button from '../Button/Button';
import './PushButton.css';

function PushButton(props) {
  const className = concatClassNames(props.className, 'push-button');
  return (
    <Button
      {...getOnlyDOMProps(props)}
      type={props.type || 'button'}
      className={className}
      theme={props.theme}
      attrs={props.attrs}
    >
      {props.children}
    </Button>
  );
}

export default PushButton;
