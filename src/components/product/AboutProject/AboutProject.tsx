import {createCn} from 'bem-react-classname';
import {HTMLAttributes} from 'react';
import shortid from 'shortid';
/* --------------------------------- Generic -------------------------------- */
import Title from '@generic/Title/Title';
import SectionHeader from '@generic/SectionHeader/SectionHeader';
import List from '@generic/List/List';
/* ---------------------------------- Utils --------------------------------- */
import {aboutProject as texts, infoTicketsList} from '@utils/texts';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from 'types/types';
/* --------------------------------- Product -------------------------------- */
import InfoTicket from '@product/InfoTicket/InfoTicket';
/* -------------------------------------------------------------------------- */
import './AboutProject.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;
/**
 * Секция с информацией о проекте: описание этапов разработки
 * */
export function AboutProject({className, ...props}: Props): JSX.Element {
  const cn = createCn('about-project', className);
  const {leftColumn, rightColumn} = texts.infoTable;

  return (
    <section {...props} className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>

      {/** Описание этапов разработки */}
      <List className={cn('info-list')} itemClassName={cn('list-item')}>
        {infoTicketsList.map((cardData) => (
          <InfoTicket key={shortid.generate()} className={cn('info-ticket')} {...cardData} />
        ))}
      </List>

      {/** Табличка с продолжительностью каждого этапа */}
      <div className={cn('info-table')}>
        <div className={cn('item')}>
          <Title headingType="h3" theme={Theme.Azure} className={cn('column-title')}>
            {leftColumn.title}
          </Title>
          <p className={cn('content')}>{leftColumn.content}</p>
        </div>
        <div className={cn('item')}>
          <Title headingType="h3" theme={Theme.Light} className={cn('column-title')}>
            {rightColumn.title}
          </Title>
          <p className={cn('content')}>{rightColumn.content}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
