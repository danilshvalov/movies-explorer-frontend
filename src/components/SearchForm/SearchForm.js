import classNames from 'classnames';
import CheckBox from '../CheckBox/CheckBox';
import PushButton from '../PushButton/PushButton';

import './SearchForm.css';
import SearchField from '../SearchField/SearchField';
import List from '../List/List';

function SearchForm(props) {
  const className = classNames('search-form', props.className);

  return (
    <form className={className}>
      <List className="search-form__list" itemClassName="search-form__list-item">
        <SearchField className="search-form__field" placeholder="Фильм">
          <PushButton className="search-form__start-button" theme="azure" attrs="rounded">
            Найти
          </PushButton>
        </SearchField>
        <CheckBox
          label="Короткометражки"
          className="search-form__check-button"
          labelClassName="search-form__check-label"
        />
      </List>
    </form>
  );
}

export default SearchForm;
