import {createCn} from 'bem-react-classname';
import React from 'react';

import CheckBox from '@generic/CheckBox/CheckBox';
import SearchField from '@generic/SearchField/SearchField';
import Button from '@generic/Button/Button';
import List from '@generic/List/List';
import {OnSearchFunc, Theme} from 'types/types';
import {searchForm as texts} from '@utils/texts';

import './SearchForm.css';

export interface SearchData {
  isChecked: boolean;
  query: string;
}

export interface SearchFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Изначальное состояние формы */
  defaultChecked?: boolean;
  onSearch: OnSearchFunc;
}

/** Поисковая форма */
const SearchForm: React.FC<SearchFormProps> = ({
  className,
  onSearch,
  defaultChecked = false,
  ...props
}) => {
  const cn = createCn('search-form', className);

  const [fieldQuery, setFieldQuery] = React.useState('');
  const [isChecked, setChecked] = React.useState(defaultChecked);

  /** Handlers */
  const handleCheckboxChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(target.checked);
  };

  const handleFieldInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFieldQuery(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSearch({isChecked, query: fieldQuery});
  };

  return (
    <form {...props} className={cn()} onSubmit={handleSubmit}>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {/** Поле поиска */}
        <SearchField
          className={cn('field')}
          placeholder={texts.field.placeholder}
          onInput={handleFieldInput}
        >
          {/** Start-кнопка */}
          <Button className={cn('start-button')} theme={Theme.Azure}>
            {texts.startButton.label}
          </Button>
        </SearchField>
        {/** Переключатель */}
        <CheckBox
          label={texts.checkBox.label}
          className={cn('check-button')}
          labelClassName={cn('check-label')}
          defaultChecked={defaultChecked}
          onChange={handleCheckboxChange}
        />
      </List>
    </form>
  );
};

export default SearchForm;