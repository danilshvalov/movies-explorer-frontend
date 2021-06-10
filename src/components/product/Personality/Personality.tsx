import {createCn} from 'bem-react-classname';
import shortid from 'shortid';
import {HTMLAttributes} from 'react';
/* --------------------------------- Generic -------------------------------- */
import Link from '@generic/Link/Link';
import List from '@generic/List/List';
/* ---------------------------------- Utils --------------------------------- */
import {personality as texts} from '@utils/texts';
/* --------------------------------- Images --------------------------------- */
import avatarImg from '@images/avatar.jpg';
/* -------------------------------------------------------------------------- */
import './Personality.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/**
 * Информация об ученике Яндекс.Практикума
 * */
export function Personality({className, ...props}: Props): JSX.Element {
  const cn = createCn('personality', className);

  return (
    <div {...props} className={cn()}>
      <article className={cn('info')}>
        {/** Имя  */}
        <h2 className={cn('name')}>{texts.name}</h2>
        {/** Краткое описание */}
        <p className={cn('feature')}>{texts.feature}</p>
        {/** Обширное "о себе" */}
        <p className={cn('description')}>{texts.description}</p>
        {/** Список ссылок на соцсети и т.п. */}
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {texts.links.map((link) => (
            <Link key={shortid.generate()} className={cn('link')} href={link.path}>
              {link.name}
            </Link>
          ))}
        </List>
      </article>
      {/** Фотография ученика */}
      <img className={cn('photo')} src={avatarImg} alt={texts.img.alt} />
    </div>
  );
}

export default Personality;
