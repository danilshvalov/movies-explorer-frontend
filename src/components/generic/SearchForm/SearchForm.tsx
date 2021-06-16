import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';
import React, {createRef, useEffect, useState} from 'react';
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

  const [fieldQuery, setFieldQuery] = useState<string>();
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [errorMessage, setErrorMessage] = useState('');
  const fieldRef = createRef<HTMLInputElement>();

  /* -------------------------------- Handlers -------------------------------- */
  function handleCheckboxChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(target.checked);
  }

  function handleSubmit(
    evt: React.FormEvent<HTMLFormElement>,
  ) {
    evt.preventDefault();

    const fieldValue = fieldRef.current?.value;
    if (fieldValue && fieldValue !== '') {
      setFieldQuery(fieldValue);
    } else {
      setErrorMessage(TEXTS.emptyFieldError);
    }
  }

  function handleChange() {
    setErrorMessage('');
  }

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    if (fieldQuery) {
      onSearch({isChecked, query: fieldQuery});
    }
  }, [isChecked, fieldQuery]);

  return (
    <form
      {...filterInvalidDOMProps(props)}
      className={cn()}
      onSubmit={handleSubmit}
      noValidate
    >
      <List
        className={cn('list')}
        itemClassName={cn('list-item')}
      >
        {/** Поле поиска */}
        <SearchField
          className={cn('field')}
          placeholder={TEXTS.field.placeholder}
          ref={fieldRef}
          onChange={handleChange}
        >
          {/** Start-кнопка */}
          <Button
            className={cn('start-button')}
            theme={Theme.Azure}
          >
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
