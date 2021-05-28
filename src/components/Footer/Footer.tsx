import shortid from 'shortid';
import {createCn} from 'bem-react-classname';
import React from 'react';

import ColoredLink from '../ColoredLink/ColoredLink';
import List from '../List/List';

import {footer as texts} from '../../utils/texts';

import './Footer.css';

export type FooterProps = React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<FooterProps> = (props) => {
  const cn = createCn('footer', props.className);
  return (
    <footer {...props} className={cn()}>
      <p className={cn('about')}>{texts.about}</p>
      <div className={cn('container')}>
        <p className={cn('copyright')}>{texts.copyright}</p>
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
