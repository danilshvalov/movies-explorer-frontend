import {concatClassNames, getOnlyDOMProps} from '../../utils/utils';
import './Input.css';

function Input(props) {
  const className = concatClassNames(props.className, 'input');

  return <input {...getOnlyDOMProps(props)} className={className} />;
}

export default Input;
