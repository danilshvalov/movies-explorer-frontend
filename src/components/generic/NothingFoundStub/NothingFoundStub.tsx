import {createCn} from 'bem-react-classname';
import React from 'react';
/* ---------------------------------- Texts --------------------------------- */
import {NOTHING_FOUND_STUB as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './NothingFoundStub.css';

export type NothingFoundStubProps = React.HTMLAttributes<HTMLSpanElement>;

/** Заглушка "Ничего не найдено" */
const NothingFoundStub: React.FC<NothingFoundStubProps> = ({className, ...props}) => {
  const cn = createCn('nothing-found', className);

  return (
    <span {...props} className={cn()}>
      <p className={cn('text')}>{TEXTS.description}</p>
      <img className={cn('picture')} src={TEXTS.img.src} alt={TEXTS.img.alt} />
    </span>
  );
};

export default NothingFoundStub;
