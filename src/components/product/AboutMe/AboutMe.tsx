import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import SectionHeader from '@/SectionHeader';
import Portfolio from '@/Portfolio';
import Personality from '@/Personality';
import {aboutMe as texts} from '@utils/texts';

import './AboutMe.css';

export type AboutMeProps = React.HTMLAttributes<HTMLDivElement>;

/** Секция с информацией об ученике (персональные данные, портфолио) Яндекс.Практикума */
const AboutMe = ({className, ...props}: AboutMeProps) => {
  const cn = createCn('about-me', className);

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
      <Personality className={cn('personality')} />
      <Portfolio className={cn('portfolio')} />
    </section>
  );
};

export default AboutMe;