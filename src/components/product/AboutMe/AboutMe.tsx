import {createCn} from 'bem-react-classname';
import {HTMLAttributes} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* --------------------------------- Product -------------------------------- */
import SectionHeader from '@generic/SectionHeader/SectionHeader';
import Portfolio from '@product/Portfolio/Portfolio';
import Personality from '@product/Personality/Personality';
/* ---------------------------------- Utils --------------------------------- */
import {aboutMe as texts} from '@utils/texts';
/* -------------------------------------------------------------------------- */

import './AboutMe.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Секция с информацией об ученике (персональные данные, портфолио) Яндекс.Практикума */
export function AboutMe({className, ...props}: Props): JSX.Element {
  const cn = createCn('about-me', className);

  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
      <Personality className={cn('personality')} />
      <Portfolio className={cn('portfolio')} />
    </section>
  );
}

export default AboutMe;
