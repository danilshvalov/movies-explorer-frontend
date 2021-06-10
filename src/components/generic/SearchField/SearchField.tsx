import React from 'react';
import {createCn} from 'bem-react-classname';

/* --------------------------------- Generic -------------------------------- */
import * as GenericField from '@generic/Field/Field';
/* ---------------------------------- Utils --------------------------------- */
import {searchForm} from '@utils/texts';
/* --------------------------------- Images --------------------------------- */
import magnifierImg from '@images/magnifier.svg';
/* -------------------------------------------------------------------------- */

import './SearchField.css';

const texts = searchForm.field;

export type SearchFieldProps = GenericField.Props;
export type RefType = GenericField.RefType;

/** Поле поисковой формы */
const SearchField = React.forwardRef<RefType, SearchFieldProps>(
  ({placeholder, className, ...props}, ref) => {
    const cn = createCn('search-field', className);

    return (
      <div className={cn()}>
        {/** Иконка увеличительного стекла */}
        <img className={cn('icon')} src={magnifierImg} alt={texts.img.alt} />
        <GenericField.Field
          {...props}
          ref={ref}
          className={cn('input')}
          placeholder={placeholder}
          required
        />
        {props.children}
      </div>
    );
  },
);

export default SearchField;
