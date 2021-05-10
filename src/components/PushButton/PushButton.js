import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import Button from '../Button/Button';
import './PushButton.css';

function PushButton(props) {
  const className = classNames(props.className, 'push-button');
  return (
    <Button
      {...filterInvalidDOMProps(props)}
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
