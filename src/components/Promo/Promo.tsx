import {createCn} from 'bem-react-classname';
import React from 'react';

import {promo as texts} from '../../utils/texts';
import NavTab from '../NavTab/NavTab';

import './Promo.css';

export type PromoProps = React.HTMLAttributes<HTMLDivElement>;

const Promo: React.FC<PromoProps> = ({className, ...props}) => {
  const cn = createCn('promo', className);
  return (
    <section {...props} className={cn()}>
      <h1 className={cn('title')}>{texts.title}</h1>
      <NavTab className={cn('nav-tab')} />
    </section>
  );
};

export default Promo;
