import {concatClassNames} from '../../utils/utils';
import CheckBox from '../CheckBox/CheckBox';
import Input from '../Input/Input';
import PushButton from '../PushButton/PushButton';

import magnifierImg from '../../images/magnifier.svg';

import './SearchForm.css';
import List from '../List/List';

function SearchForm(props) {
  const className = concatClassNames(props.className, 'search-form');

  return (
    <form className={className}>
      <div className="search-form__container">
        <div className="search-form__field">
          <img
            className="search-form__icon"
            src={magnifierImg}
            alt="Иконка увеличительного стекла"
          />
          <Input className="search-form__input" placeholder="Фильм" />
        </div>
        <List className="search-form__list">
          <li className="search-form__list-item">
            <PushButton className="search-form__start-button" theme="azure" attrs="rounded">
              Найти
            </PushButton>
          </li>
          <li className="search-form__list-item">
            <CheckBox text="Короткометражки" className="search-form__check-button" />
          </li>
        </List>
      </div>
    </form>
  );
}

export default SearchForm;
