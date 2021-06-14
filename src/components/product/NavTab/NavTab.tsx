import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';
/* -------------------------------- Generics -------------------------------- */
import Link from '@generic/Link/Link';
import * as GenericList from '@generic/List/List';
/* ---------------------------------- TEXTS --------------------------------- */
import {NAV_TAB as TEXTS} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './NavTab.css';

export type Props = GenericList.Props;

export function NavTab({className, ...props}: Props): JSX.Element {
  const cn = createCn('nav-tab', className);
  return (
    <GenericList.List {...props} className={cn()} itemClassName={cn('item')}>
      {TEXTS.buttons.map((btn) => (
        <Link key={shortid.generate()} className={cn('button')} href={`#${btn.to}`}>
          {btn.text}
        </Link>
      ))}
    </GenericList.List>
  );
}

export default NavTab;
