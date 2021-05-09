import {concatClassNames} from '../../utils/utils';
import './Form.css';

function Form(props) {
  const className = concatClassNames(props.className, 'form');

  return (
    <form className={className}>
      {props.title && <h2 className="form__title">{props.title}</h2>}
      {props.children}
    </form>
  );
}

export default Form;
