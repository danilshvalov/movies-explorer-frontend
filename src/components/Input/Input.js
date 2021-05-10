import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import './Input.css';

function Input(props) {
  const className = classNames('input', props.className);

  return <input {...filterInvalidDOMProps(props)} className={className} />;
}

export default Input;
