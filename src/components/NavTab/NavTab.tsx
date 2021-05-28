import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';

import {navTab as texts} from '../../utils/texts';
import Button from '../Button/Button';
import List, {ListProps} from '../List/List';

import './NavTab.css';

export type NavTabProps = ListProps;

const NavTab: React.FC<NavTabProps> = ({className, ...props}) => {
  const cn = createCn('nav-tab', className);
  return (
    <List {...props} className={cn()} itemClassName={cn('item')}>
      {texts.buttons.map((btn) => (
        <Button key={shortid.generate()} className={cn('button')}>
          {btn.text}
        </Button>
      ))}
    </List>
  );
};

export default NavTab;
