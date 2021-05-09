import {concatClassNames, getOnlyDOMProps} from '../../utils/utils';
import './Field.css';

function Field(props) {
  const isValid = false;

  const fieldClassName = concatClassNames(props.className, 'field');
  const inputClassName = concatClassNames(props.inputClassName, 'field__input');
  const errorClassName = concatClassNames(
    props.errorClassName,
    'field__error-message',
    isValid ? '' : 'field__error-message_visible',
  );
  const labelClassName = concatClassNames(props.labelClassName, 'field__label');
  return (
    <div className={fieldClassName}>
      <label className={labelClassName}>{props.label}</label>
      <input {...getOnlyDOMProps(props)} className={inputClassName} />
      <span className={errorClassName}>Что-то пошло не так</span>
    </div>
  );
}

export default Field;
