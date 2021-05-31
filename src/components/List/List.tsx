import React from 'react';
import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import './List.css';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** className <li/> элемента */
  itemClassName?: string;
}

export type RefType = HTMLUListElement;

/**
 * Компонент-обёртка над [списком]{@link HTMLUListElement}
 * Все дочерние элементы помещаются в {@link HTMLLIElement}
 */
const List = React.forwardRef<RefType, ListProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('list', className);
    const itemClassName = classNames(cn('item'), props.itemClassName);

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
