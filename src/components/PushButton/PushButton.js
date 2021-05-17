import classNames from 'classnames';
import Button from '../Button/Button.tsx';
import './PushButton.css';

function PushButton(props) {
  const className = classNames(props.className, 'push-button');
  return (
    <Button
      {...props}
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
