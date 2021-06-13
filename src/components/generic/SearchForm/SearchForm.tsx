import {createCn} from 'bem-react-classname';
import React from 'react';
/* -------------------------------- Generics -------------------------------- */
import CheckBox from '@generic/CheckBox/CheckBox';
import SearchField from '@generic/SearchField/SearchField';
import Button from '@generic/Button/Button';
import List from '@generic/List/List';
/* ---------------------------------- Types --------------------------------- */
import {OnSearchFunc, Theme} from 'types/types';
/* ---------------------------------- Texts --------------------------------- */
import {SEARCH_FORM as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './SearchForm.css';

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

    if (fieldQuery !== '') {
      onSearch({isChecked, query: fieldQuery});
    } else {
      // TODO добавить ошибку
    }
  };

  return (
    <form {...props} className={cn()} onSubmit={handleSubmit} noValidate>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {/** Поле поиска */}
        <SearchField
          className={cn('field')}
          placeholder={TEXTS.field.placeholder}
          onInput={handleFieldInput}
        >
          {/** Start-кнопка */}
          <Button className={cn('start-button')} theme={Theme.Azure}>
            {TEXTS.startButton.label}
          </Button>
        </SearchField>
        {/** Переключатель */}
        <CheckBox
          label={TEXTS.checkBox.label}
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
