import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';

import SectionHeader from '../SectionHeader/SectionHeader';
import {aboutProject as texts, infoTicketsList} from '../../utils/texts';
import List from '../List/List';
import InfoTicket from '../InfoTicket/InfoTicket';
import {Theme} from '../../utils/types';
import ColoredTitle from '../ColoredTitle/ColoredTitle';

import './AboutProject.css';

export type AboutProjectProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Секция с информацией о проекте: описание этапов разработки
 * */
const AboutProject: React.FC<AboutProjectProps> = ({className, ...props}) => {
  const cn = createCn('about-project', className);
  const {leftColumn, rightColumn} = texts.infoTable;

  return (
    <section {...props} className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>

      {/** Описание этапов разработки */}
      <List className={cn('info-list')} itemClassName={cn('list-item')}>
        {infoTicketsList.map((cardData) => (
          <InfoTicket
            key={shortid.generate()}
            className={cn('info-ticket')}
            {...cardData}
          />
        ))}
      </List>

      {/** Табличка с продолжительностью каждого этапа */}
      <div className={cn('info-table')}>
        <div className={cn('item')}>
          <ColoredTitle
            headingType="h3"
            theme={Theme.Azure}
            className={cn('column-title')}
          >
            {leftColumn.title}
          </ColoredTitle>
          <p className={cn('content')}>{leftColumn.content}</p>
        </div>
        <div className={cn('item')}>
          <ColoredTitle
            headingType="h3"
            theme={Theme.Light}
            className={cn('column-title')}
          >
            {rightColumn.title}
          </ColoredTitle>
          <p className={cn('content')}>{rightColumn.content}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
