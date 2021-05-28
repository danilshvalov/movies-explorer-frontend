import {createCn} from 'bem-react-classname';
import React from 'react';

import CheckBox from '../CheckBox/CheckBox';
import SearchField from '../SearchField/SearchField';
import Button from '../Button/Button';
import List from '../List/List';
import {Theme} from '../../utils/types';
import {searchForm as texts} from '../../utils/texts';

import './SearchForm.css';

export interface SearchFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  onChecked: Function;
  defaultChecked?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  className,
  onChecked,
  defaultChecked = false,
  ...props
}) => {
  const handleCheckboxChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(target.checked);
  };

  const cn = createCn('search-form', className);

  return (
    <form {...props} className={cn()}>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        <SearchField
          className={cn('field')}
          placeholder={texts.field.placeholder}
        >
          <Button className={cn('start-button')} theme={Theme.Azure} rounded>
            {texts.startButton.label}
          </Button>
        </SearchField>
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
