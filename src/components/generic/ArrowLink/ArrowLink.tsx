import {createCn} from 'bem-react-classname';
import React from 'react';

import ColoredLink, {ColoredLinkProps} from '@/ColoredLink';
import arrowLinkImg from '@images/arrow-link.svg';
import {arrowLink as texts} from '@utils/texts';

import './ArrowLink.css';

export type ArrowLinkProps = ColoredLinkProps;

/** Ссылка с картинкой стрелочки */
const ArrowLink: React.FC<ArrowLinkProps> = ({className, ...props}) => {
  const cn = createCn('arrow-link', className);

  return (
    <ColoredLink {...props} className={cn()}>
      {props.children}
      <img className={cn('picture')} src={arrowLinkImg} alt={texts.img.alt} />
    </ColoredLink>
  );
};

export default ArrowLink;
