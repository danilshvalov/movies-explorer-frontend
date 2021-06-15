import shortid from 'shortid';
import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* -------------------------------- Generics -------------------------------- */
import Link from '@generic/Link/Link';
import List from '@generic/List/List';
/* ---------------------------------- Texts --------------------------------- */
import {FOOTER as TEXTS} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './Footer.css';

export type FooterProps = React.HTMLAttributes<HTMLDivElement>;

export function Footer({className, ...props}: FooterProps): JSX.Element {
  const cn = createCn('footer', className);
  return (
    <footer {...filterInvalidDOMProps(props)} className={cn()}>
      {/** Надпись по середине футера */}
      <p className={cn('about')}>{TEXTS.about}</p>
      <div className={cn('container')}>
        {/** Copyright-надпись с текущим годом */}
        <p className={cn('copyright')}>{TEXTS.copyright}</p>

        {/** Список ссылок на внешние сервисы */}
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {TEXTS.links.map((item) => (
            <Link key={shortid.generate()} className={cn('link')} href={item.path}>
              {item.name}
            </Link>
          ))}
        </List>
      </div>
    </footer>
  );
}

export default Footer;
