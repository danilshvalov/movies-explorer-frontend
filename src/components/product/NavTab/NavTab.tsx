import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';

import {navTab as texts} from '@utils/texts';
import List, {DOMProps as ListProps} from '@/List/List';

import './NavTab.css';
import ColoredLink from '@/ColoredLink/ColoredLink';

// TODO изменить вид
export type NavTabProps = ListProps;

const NavTab: React.FC<NavTabProps> = ({className, ...props}) => {
  const cn = createCn('nav-tab', className);
  return (
    <List {...props} className={cn()} itemClassName={cn('item')}>
      {texts.buttons.map((btn) => (
        <ColoredLink key={shortid.generate()} className={cn('button')} href={`#${btn.to}`}>
          {btn.text}
        </ColoredLink>
      ))}
    </List>
  );
};

export default NavTab;
