import {getOnlyDOMProps, parseAttrsToArray} from '../../utils/utils';
import './Button.css';

function Button(props) {
  const themeClass = `button_theme_${props.theme || 'light'}`;
  const disabledClass = props.isDisabled ? 'button_disabled' : '';

  const attrs = parseAttrsToArray(props.attrs).map((item) => `button_${item}`).join(' ');

  const className = `button ${themeClass} ${disabledClass} ${attrs}`;
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
