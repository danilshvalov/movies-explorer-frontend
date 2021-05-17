import {createCn} from 'bem-react-classname';
import React from 'react';

import SectionHeader from '../SectionHeader/SectionHeader';
import Portfolio from '../Portfolio/Portfolio';
import Personality from '../Personality/Personality';
import {aboutMe as texts} from '../../utils/texts';

import './AboutMe.css';

const AboutMe = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const cn = createCn('about-me', props.className);

  return (
    <section className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
      <Personality className={cn('profile')} />
      <Portfolio className={cn('portfolio')} />
    </section>
  );
};

export default AboutMe;
