import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';
import React, {createRef, FormHTMLAttributes, useState} from 'react';
/* -------------------------------- Generics -------------------------------- */
import CheckBox from '@generic/CheckBox/CheckBox';
import SearchField from '@generic/SearchField/SearchField';
import Button from '@generic/Button/Button';
import List from '@generic/List/List';
import ErrorMessage from '@generic/ErrorMessage/ErrorMessage';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from '@types-src/types';
import {OnSearchFunc} from 'types/functional';
/* ---------------------------------- Texts --------------------------------- */
import {SEARCH_FORM as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './SearchForm.css';

export interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Изначальное состояние формы */
  defaultChecked?: boolean;
  defaultQuery?: string;
  onSearch: OnSearchFunc;
}

/**
 * Поисковая форма
 *
 * @see {@link SearchField}
 * */
function SearchForm({
  className,
  onSearch,
  defaultChecked = false,
  defaultQuery = '',
  ...props
}: SearchFormProps): JSX.Element {
  const cn = createCn('search-form', className);

  const [fieldQuery, setFieldQuery] = useState(defaultQuery);
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [errorMessage, setErrorMessage] = useState('');
  const fieldRef = createRef<HTMLInputElement>();

  /* -------------------------------- Handlers -------------------------------- */
  function handleCheckboxChange({target}: React.ChangeEvent<HTMLInputElement>) {
    const {checked} = target;
    setIsChecked(checked);

    if (fieldQuery) {
      onSearch({isChecked: checked, query: fieldQuery});
    }
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const fieldValue = fieldRef.current?.value;
    if (fieldValue && fieldValue !== '') {
      setFieldQuery(fieldValue);
      onSearch({isChecked, query: fieldValue});
    } else {
      setErrorMessage(TEXTS.emptyFieldError);
    }
  }

  function handleChange() {
    setErrorMessage('');
  }

  return (
    <form
      {...filterInvalidDOMProps(props)}
      className={cn()}
      onSubmit={handleSubmit}
      noValidate
    >
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {/** Поле поиска */}
        <SearchField
          className={cn('field')}
          placeholder={TEXTS.field.placeholder}
          ref={fieldRef}
          onChange={handleChange}
          defaultValue={fieldQuery}
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
          checked={isChecked}
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
