import React from 'react';
import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import * as GenericField from '@generic/Field/Field';
/* ---------------------------------- Texts --------------------------------- */
import {SEARCH_FORM} from '@texts/generic';
/* --------------------------------- Images --------------------------------- */
import images from '@images';
/* -------------------------------------------------------------------------- */

import './SearchField.css';

const TEXTS = SEARCH_FORM.field;

export type SearchFieldProps = GenericField.Props;
export type RefType = GenericField.RefType;

/** Поле поисковой формы */
const SearchField = React.forwardRef<RefType, SearchFieldProps>(
  ({placeholder, className, ...props}, ref) => {
    const cn = createCn('search-field', className);

    return (
      <div className={cn()}>
        {/** Иконка увеличительного стекла */}
        <img
          className={cn('icon')}
          src={images.MAGNIFIER}
          alt={TEXTS.img.alt}
        />
        <GenericField.Field
          {...props}
          ref={ref}
          className={cn('input', {error: props.isError || false})}
          placeholder={placeholder || ''}
          required
        />
        {props.children}
      </div>
    );
  },
);

export default SearchField;
