import {getOnlyDOMProps} from '../../utils/utils';
import './CheckBox.css';

function CheckBox(props) {
  return (
    <div className="checkbox">
      <input
        {...getOnlyDOMProps}
        className="checkbox__button"
        type="checkbox"
        checked={props.isChecked}
      />
      <label className="checkbox__text">{props.text}</label>
    </div>
  );
}

export default CheckBox;
