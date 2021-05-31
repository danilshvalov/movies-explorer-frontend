import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import {sectionIds} from '../../utils/config';

import './Main.css';

export type MainProps = React.HTMLAttributes<HTMLDivElement>;

const Main = (props: MainProps) => (
  <main {...filterInvalidDOMProps(props)} className="content">
    <Promo id={sectionIds.promo} />
    <AboutProject id={sectionIds.aboutProject} />
    <Techs id={sectionIds.techs} />
    <AboutMe id={sectionIds.aboutMe} />
  </main>
);

export default Main;
