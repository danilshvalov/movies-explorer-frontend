import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import './List.css';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  itemClassName?: string;
}

export type RefType = HTMLUListElement;

const List = React.forwardRef<RefType, ListProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('list', className);
    const itemClassName = classNames('list__item', props.itemClassName);

    return (
      <ul {...filterInvalidDOMProps(props)} className={cn()} ref={ref}>
        {React.Children.map(props.children, (child) => (
          <li className={itemClassName}>{child}</li>
        ))}
      </ul>
    );
  },
);

export default List;
