import React from 'react';
import {createCn} from 'bem-react-classname';
import shortid from 'shortid';

import List from '../List/List';
import ArrowLink from '../ArrowLink/ArrowLink';
import {portfolio as texts} from '../../utils/texts';

import './Portfolio.css';

export interface IPortfolioLink {
  name: string;
  path: any;
}
export type PortfolioProps = React.HTMLAttributes<HTMLDivElement>;

const Portfolio: React.FC<PortfolioProps> = ({className, ...props}) => {
  const cn = createCn('portfolio', className);
  return (
    <div {...props} className={cn()}>
      <h3 className={cn('header')}>{texts.header}</h3>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {texts.links.map((item) => (
          <ArrowLink
            key={shortid.generate()}
            className={cn('link')}
            href={item.path}
          >
            {item.name}
          </ArrowLink>
        ))}
      </List>
    </div>
  );
};

export default Portfolio;
