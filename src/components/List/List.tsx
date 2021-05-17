import {createCn} from 'bem-react-classname';
import classNames from 'classnames';
import React from 'react';

import './List.css';

export interface IListProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode[] | React.ReactNode;
  itemClassName?: string;
}

const List = React.memo((props: IListProps) => {
  const cn = createCn('list', props.className);
  const itemClassName = classNames('list__item', props.itemClassName);

  return (
    <ul className={cn()}>
      {React.Children.map(props.children, (child) => (
        <li className={itemClassName}>{child}</li>
      ))}
    </ul>
  );
});

export default List;
