import {createCn} from 'bem-react-classname';
import React from 'react';

import ColoredLink, {ColoredLinkProps} from '../ColoredLink/ColoredLink';
import arrowLinkImg from '../../images/arrow-link.svg';

import './ArrowLink.css';

function ArrowLink(props: ColoredLinkProps) {
  const cn = createCn('arrow-link', props.className);

  return (
    <ColoredLink {...props} className={cn()}>
      {props.children}
      <img className={cn('picture')} src={arrowLinkImg} />
    </ColoredLink>
  );
}

export default ArrowLink;
