import {createCn} from 'bem-react-classname';
import React from 'react';
import shortid from 'shortid';

import SectionHeader from '../SectionHeader/SectionHeader';
import {aboutProject as texts, infoTicketsList} from '../../utils/texts';
import List from '../List/List';
import InfoTicket from '../InfoTicket/InfoTicket';

import './AboutProject.css';

export type AboutProjectProps = React.HTMLAttributes<HTMLDivElement>;

const AboutProject: React.FC<AboutProjectProps> = ({className, ...props}) => {
  const cn = createCn('about-project', className);

  return (
    <section {...props} className={cn()}>
      <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
      <List className={cn('info-list')} itemClassName={cn('list-item')}>
        {infoTicketsList.map((cardData) => (
          <InfoTicket
            key={shortid.generate()}
            className={cn('info-ticket')}
            {...cardData}
          />
        ))}
      </List>

      <div className={cn('info-table')}>
        <div className={cn('item')}>
          <h3 className={cn('column-title', {theme: 'azure'})}>1 неделя</h3>
          <p className={cn('content')}>Back-end</p>
        </div>
        <div className={cn('item')}>
          <h3 className={cn('column-title', {theme: 'light'})}>4 недели</h3>
          <p className={cn('content')}>Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
