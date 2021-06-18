import {createCn} from 'bem-react-classname';
import shortid from 'shortid';
import React, {HTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
/* --------------------------------- Generic -------------------------------- */
import {Link as GenericLink} from '@generic/Link/Link';
import List from '@generic/List/List';
/* ---------------------------------- Types --------------------------------- */
import {LinkList as LinksList} from 'types/types';
/* -------------------------------------------------------------------------- */
import './Navigation.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps {
  underline: boolean;
}
export interface DataProps {
  linksList: LinksList;
}
export type Props = DOMProps & FunctionalProps & DataProps;

/** Компонент навигации по сайту */
export function Navigation({
  className, linksList, underline, ...props
}: Props): JSX.Element {
  const cn = createCn('navigation', className);
  return (
    <nav {...props} className={className}>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {linksList.map(({name, path}) => (
          <Link
            component={GenericLink}
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
}

export default Navigation;
