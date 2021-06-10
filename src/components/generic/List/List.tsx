import React from 'react';
import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import './List.css';

// export namespace List {
export type DOMProps = React.HTMLAttributes<HTMLUListElement>;
export interface FunctionalProps {
  itemClassName?: string;
}

export type Props = DOMProps & FunctionalProps;

export type RefType = React.ForwardedRef<HTMLUListElement>;

/**
 * Компонент-обёртка над [списком]{@link HTMLUListElement}
 * Все дочерние элементы помещаются в {@link HTMLLIElement}
 */
export function List(props: Props, ref: RefType): JSX.Element {
  const cn = createCn('list', props.className);
  const itemClassName = classNames(cn('item'), props.itemClassName);

  return (
    <ul {...filterInvalidDOMProps(props)} className={cn()} ref={ref}>
      {React.Children.map(props.children, (child) => (
        <li className={itemClassName}>{child}</li>
      ))}
    </ul>
  );
}

export default React.forwardRef(List);
