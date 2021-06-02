import shortid from 'shortid';
import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import ColoredLink from '../ColoredLink/ColoredLink';
import List from '../List/List';
import {footer as texts} from '../../utils/texts';

import './Footer.css';

export type FooterProps = React.HTMLAttributes<HTMLDivElement>;

const Footer = ({className, ...props}: FooterProps) => {
  const cn = createCn('footer', className);
  return (
    <footer {...filterInvalidDOMProps(props)} className={cn()}>
      {/** Надпись по середине футера */}
      <p className={cn('about')}>{texts.about}</p>
      <div className={cn('container')}>
        {/** Copyright-надпись с текущим годом */}
        <p className={cn('copyright')}>{texts.copyright}</p>

        {/** Список ссылок на внешние сервисы */}
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {texts.links.map((item) => (
            <ColoredLink
              key={shortid.generate()}
              className={cn('link')}
              href={item.path}
            >
              {item.name}
            </ColoredLink>
          ))}
        </List>
      </div>
    </footer>
  );
};

export default Footer;
