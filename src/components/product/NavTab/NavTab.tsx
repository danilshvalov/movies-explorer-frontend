import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';
/* -------------------------------- Generics -------------------------------- */
import Link from '@generic/Link/Link';
import * as GenericList from '@generic/List/List';
/* ---------------------------------- Utils --------------------------------- */
import {navTab as texts} from '@utils/texts';
/* -------------------------------------------------------------------------- */
import './NavTab.css';

// TODO изменить вид
export type Props = GenericList.Props;

export function NavTab({className, ...props}: Props): JSX.Element {
  const cn = createCn('nav-tab', className);
  return (
    <GenericList.List {...props} className={cn()} itemClassName={cn('item')}>
      {texts.buttons.map((btn) => (
        <Link key={shortid.generate()} className={cn('button')} href={`#${btn.to}`}>
          {btn.text}
        </Link>
      ))}
    </GenericList.List>
  );
}

export default NavTab;
