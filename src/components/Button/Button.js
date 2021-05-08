import {getOnlyDOMProps} from '../../utils/utils';
import './Button.css';

function Button(props) {
  const themeClass = `button_theme_${props.theme || 'light'}`;
  const disabledClass = props.isDisabled ? 'button_disabled' : '';

  const className = `button ${themeClass} ${disabledClass}`;
  return (
    <button
      {...getOnlyDOMProps}
      className={`${props.className ? props.className : ''} ${className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
