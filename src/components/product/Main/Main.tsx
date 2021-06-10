import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import AboutMe from '@/AboutMe';
import AboutProject from '@/AboutProject';
import Techs from '@/Techs';
import Promo from '@/Promo';
import PageWrapper from '@/PageWrapper';
import {SECTIONS_IDS} from '@utils/config';

import './Main.css';

export type MainProps = React.HTMLAttributes<HTMLDivElement>;

const Main = (props: MainProps) => (
  <main {...filterInvalidDOMProps(props)} className="content">
    <Promo id={SECTIONS_IDS.promo} />
    <AboutProject id={SECTIONS_IDS.aboutProject} />
    <Techs id={SECTIONS_IDS.techs} />
    <AboutMe id={SECTIONS_IDS.aboutMe} />
  </main>
);

const MainPage = (props: MainProps) => (
  <PageWrapper>
    <Main {...props} />
  </PageWrapper>
);

export default MainPage;
