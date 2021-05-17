import React from 'react';
import {createCn} from 'bem-react-classname';
import shortid from 'shortid';

import avatarImg from '../../images/avatar.png';
import List from '../List/List';
import {personality as texts} from '../../utils/texts';
import ColoredLink from '../ColoredLink/ColoredLink';

import './Personality.css';

export type PersonalityProps = React.HTMLAttributes<HTMLDivElement>;

const Personality: React.FC<PersonalityProps> = ({className, ...props}) => {
  const cn = createCn('personality', className);

  return (
    <div {...props} className={className}>
      <article className={cn('info')}>
        <h2 className={cn('name')}>{texts.name}</h2>
        <p className={cn('feature')}>{texts.feature}</p>
        <p className={cn('description')}>{texts.description}</p>
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {texts.links.map((link) => (
            <ColoredLink key={shortid.generate()} className={cn('link')} to={link.path}>
              {link.name}
            </ColoredLink>
          ))}
        </List>
      </article>
      <img className={cn('photo')} src={avatarImg} />
    </div>
  );
};

export default Personality;
