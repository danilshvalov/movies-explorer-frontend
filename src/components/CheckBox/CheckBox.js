import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import './CheckBox.css';

function CheckBox(props) {
  const className = classNames(props.className, 'checkbox');
  const buttonClassName = classNames(props.buttonClassName, 'checkbox__button');
  const labelClassName = classNames(props.labelClassName, 'checkbox__label');
  return (
    <div className={className}>
      <input
        {...filterInvalidDOMProps(props)}
        className={buttonClassName}
        type="checkbox"
        checked={props.isChecked}
      />
      <label className={labelClassName}>{props.label}</label>
    </div>
  );
}

export default CheckBox;
