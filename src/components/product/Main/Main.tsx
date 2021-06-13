import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import PageWrapper from '@generic/PageWrapper/PageWrapper';
/* -------------------------------- Products -------------------------------- */
import AboutMe from '@product/AboutMe/AboutMe';
import AboutProject from '@product/AboutProject/AboutProject';
import Techs from '@product/Techs/Techs';
import Promo from '@product/Promo/Promo';
/* ---------------------------------- Utils --------------------------------- */
import {SECTIONS_IDS} from '@utils/config';
/* -------------------------------------------------------------------------- */
import './Main.css';

export type MainProps = React.HTMLAttributes<HTMLDivElement>;

export function Main(props: MainProps): JSX.Element {
  const cn = createCn('content', props.className);
  return (
    <main {...filterInvalidDOMProps(props)} className={cn()}>
      <Promo id={SECTIONS_IDS.promo} />
      <AboutProject id={SECTIONS_IDS.aboutProject} />
      <Techs id={SECTIONS_IDS.techs} />
      <AboutMe id={SECTIONS_IDS.aboutMe} />
    </main>
  );
}

export function MainPage(props: MainProps): JSX.Element {
  return (
    <PageWrapper>
      <Main {...props} />
    </PageWrapper>
  );
}

export default MainPage;
