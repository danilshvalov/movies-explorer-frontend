import classNames from 'classnames';
import Input from '../Input/Input';

import magnifierImg from '../../images/magnifier.svg';
import './SearchField.css';

function SearchField(props) {
  const className = classNames('search-field', props.className);

  return (
    <div className={className}>
      <img className="search-field__icon" src={magnifierImg} alt="Иконка увеличительного стекла" />
      <Input className="search-field__input" placeholder={props.placeholder} />
      {props.children}
    </div>
  );
}

export default SearchField;
