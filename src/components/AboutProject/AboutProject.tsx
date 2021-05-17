import {createCn} from 'bem-react-classname';
import React from 'react';

import InfoCardList from '../InfoCardList/InfoCardList';
import InfoTable from '../InfoTable/InfoTable';
import SectionHeader from '../SectionHeader/SectionHeader';
import {aboutProject as texts} from '../../utils/texts';

import './AboutProject.css';

const AboutProject = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const cn = createCn('about-project', props.className);
  return (
    <section className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
      <InfoCardList className={cn('list')} />
      <InfoTable className={cn('info-table')} />
    </section>
  );
};

export default AboutProject;
