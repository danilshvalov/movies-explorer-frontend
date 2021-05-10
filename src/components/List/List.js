import classNames from 'classnames';
import React from 'react';
import shortid from 'shortid';
import './List.css';

function List(props) {
  const listClassName = classNames('list', props.className);
  const itemClassName = classNames('list__item', props.itemClassName);

  return (
    <ul className={listClassName}>
      {props.children.map((item) => {
        const key = item.key || shortid.generate();
        return (
          <li key={key} className={itemClassName}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default List;
