import {createCn} from 'bem-react-classname';
import shortid from 'shortid';
import React from 'react';

import ColoredLink from '../ColoredLink/ColoredLink';
import {navigationLinks} from '../../utils/constants';
import List from '../List/List';
import CurrentUserContext from '../../contexts/CurrentUserContexts';

import './Navigation.css';

export type INavigationProps = React.HTMLAttributes<HTMLDivElement>;

const Navigation: React.FC<INavigationProps> = ({className, ...props}) => {
  const {isLoggedIn} = React.useContext(CurrentUserContext);

  const cn = createCn('navigation', className);
  return (
    <nav {...props} className={className}>
      {!isLoggedIn && (
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {navigationLinks.map(({name, path}) => (
            <ColoredLink key={shortid.generate()} className={cn('link')} to={path}>
              {name}
            </ColoredLink>
          ))}
        </List>
      )}
    </nav>
  );
};

export default Navigation;
