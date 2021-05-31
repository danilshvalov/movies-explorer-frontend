import React from 'react';
import {createCn} from 'bem-react-classname';
import shortid from 'shortid';

import avatarImg from '../../images/avatar.jpg';
import List from '../List/List';
import {personality as texts} from '../../utils/texts';
import ColoredLink from '../ColoredLink/ColoredLink';

import './Personality.css';

export type PersonalityProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Информация об ученике Яндекс.Практикума
 * */
const Personality = ({className, ...props}: PersonalityProps) => {
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
            <ColoredLink
              key={shortid.generate()}
              className={cn('link')}
              href={link.path}
            >
              {link.name}
            </ColoredLink>
          ))}
        </List>
      </article>
      {/** Фотография ученика */}
      <img className={cn('photo')} src={avatarImg} alt={texts.img.alt} />
    </div>
  );
};

export default Personality;
