import {createCn} from 'bem-react-classname';
import shortid from 'shortid';
import React from 'react';
import {Link} from 'react-router-dom';

import ColoredLink from '../ColoredLink/ColoredLink';
import List from '../List/List';
import {LinkList} from '../../utils/types';

import './Navigation.css';

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  linksList: LinkList;
  underline: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  className,
  linksList,
  underline,
  ...props
}) => {
  const cn = createCn('navigation', className);
  return (
    <nav {...props} className={className}>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {linksList.map(({name, path}) => (
          <Link
            component={ColoredLink}
            key={shortid.generate()}
            className={cn('link', {
              underlined: underline && path === window.location.pathname,
            })}
            to={path}
          >
            {name}
          </Link>
        ))}
      </List>
    </nav>
  );
};

export default Navigation;
