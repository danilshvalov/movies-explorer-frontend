import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import AboutMe from '@product/AboutMe/AboutMe';
import AboutProject from '@product/AboutProject/AboutProject';
import Techs from '@product/Techs/Techs';
import Promo from '@product/Promo/Promo';
import PageWrapper from '@generic/PageWrapper/PageWrapper';
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
