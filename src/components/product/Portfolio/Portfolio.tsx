import {HTMLAttributes} from 'react';
import {createCn} from 'bem-react-classname';
import shortid from 'shortid';
/* --------------------------------- Generic -------------------------------- */
import List from '@generic/List/List';
import ArrowLink from '@generic/ArrowLink/ArrowLink';
/* ---------------------------------- Utils --------------------------------- */
import {portfolio as texts} from '@utils/texts';
/* -------------------------------------------------------------------------- */
import './Portfolio.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Секция с ссылками на проекты из портфолио */
export function Portfolio({className, ...props}: Props): JSX.Element {
  const cn = createCn('portfolio', className);
  return (
    <div {...props} className={cn()}>
      <h3 className={cn('header')}>{texts.header}</h3>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {texts.links.map((item) => (
          <ArrowLink key={shortid.generate()} className={cn('link')} href={item.path}>
            {item.name}
          </ArrowLink>
        ))}
      </List>
    </div>
  );
}

export default Portfolio;
