import {createCn} from 'bem-react-classname';
import React from 'react';

import CheckBox from '../CheckBox/CheckBox';
import SearchField from '../SearchField/SearchField';
import List from '../List/List';

import './SearchForm.css';
import Button, {ButtonTheme} from '../Button/Button';

export interface SearchFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  onChecked: Function;
  defaultChecked?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onChecked,
  defaultChecked = false,
  ...props
}) => {
  const handleCheckboxChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(target.checked);
  };

  const cn = createCn('search-form', props.className);

  return (
    <form className={cn()}>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        <SearchField className={cn('field')} placeholder="Фильм">
          <Button
            className={cn('start-button')}
            theme={ButtonTheme.Azure}
            rounded
          >
            Найти
          </Button>
        </SearchField>
        <CheckBox
          label="Короткометражки"
          className={cn('check-button')}
          labelClassName={cn('label')}
          defaultChecked={defaultChecked}
          onChange={handleCheckboxChange}
        />
      </List>
    </form>
  );
};

export default SearchForm;
