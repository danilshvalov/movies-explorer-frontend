import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';
import React, {useState} from 'react';
/* -------------------------------- Generics -------------------------------- */
import CheckBox from '@generic/CheckBox/CheckBox';
import SearchField from '@generic/SearchField/SearchField';
import Button from '@generic/Button/Button';
import List from '@generic/List/List';
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
/* ---------------------------------- Types --------------------------------- */
import {OnSearchFunc, Theme} from 'types/types';
/* ---------------------------------- Texts --------------------------------- */
import {SEARCH_FORM as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './SearchForm.css';

export interface SearchFormProps<T>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Изначальное состояние формы */
  defaultChecked?: boolean;
  onSearch: OnSearchFunc<T>;
}

/** Поисковая форма */
function SearchForm<T>({
  className,
  onSearch,
  defaultChecked = false,
  ...props
}: SearchFormProps<T>): JSX.Element {
  const cn = createCn('search-form', className);

  const [fieldQuery, setFieldQuery] = useState('');
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [errorMessage, setErrorMessage] = useState('');

  /** Handlers */
  const handleCheckboxChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(target.checked);
  };

  const handleFieldInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFieldQuery(evt.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (fieldQuery !== '') {
      onSearch({isChecked, query: fieldQuery});
    } else {
      setErrorMessage(TEXTS.emptyFieldError);
    }
  };

  return (
    <form {...filterInvalidDOMProps(props)} className={cn()} onSubmit={handleSubmit} noValidate>
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
      <ErrorMessage className={cn('error-message')}>
        {errorMessage}
      </ErrorMessage>
    </form>
  );
}

export default SearchForm;
