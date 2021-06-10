import {createCn} from 'bem-react-classname';
import React from 'react';

import {nothingFoundStub as texts} from '@utils/texts';

import './NothingFoundStub.css';

export type NothingFoundStubProps = React.HTMLAttributes<HTMLSpanElement>;

/** Заглушка "Ничего не найдено" */
const NothingFoundStub: React.FC<NothingFoundStubProps> = ({className, ...props}) => {
  const cn = createCn('nothing-found', className);

  return (
    <span {...props} className={cn()}>
      <p className={cn('text')}>{texts.description}</p>
      <img className={cn('picture')} src={texts.img.src} alt={texts.img.alt} />
    </span>
  );
};

export default NothingFoundStub;
