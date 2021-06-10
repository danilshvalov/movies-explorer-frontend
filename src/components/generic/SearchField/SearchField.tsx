import React from 'react';
import {createCn} from 'bem-react-classname';

import Field, {FieldProps, RefType as FieldRefType} from '@/Field/Field';
import magnifierImg from '@images/magnifier.svg';
import {searchForm} from '@utils/texts';

import './SearchField.css';

const texts = searchForm.field;

export type SearchFieldProps = FieldProps;
export type RefType = FieldRefType;

/** Поле поисковой формы */
const SearchField = React.forwardRef<RefType, SearchFieldProps>(
  ({placeholder, className, ...props}, ref) => {
    const cn = createCn('search-field', className);

    return (
      <div className={cn()}>
        {/** Иконка увеличительного стекла */}
        <img className={cn('icon')} src={magnifierImg} alt={texts.img.alt} />
        <Field {...props} ref={ref} className={cn('input')} placeholder={placeholder} required />
        {props.children}
      </div>
    );
  },
);

export default SearchField;
