import {createCn} from 'bem-react-classname';
import React from 'react';

import {techsData} from '../../utils/constants';
import List from '../List/List';
import SectionHeader from '../SectionHeader/SectionHeader';

import './Techs.css';

export type ITechsProps = React.HTMLAttributes<HTMLDivElement>;

const Techs: React.FC<ITechsProps> = ({className, ...props}) => {
  const {list, about} = techsData;
  const cn = createCn('techs', className);
  return (
    <section {...props} className={cn()}>
      <SectionHeader className={cn('hedaer')}>Технологии</SectionHeader>
      <h2 className={cn('title')}>{`${list.length} технологий`}</h2>
      <p className={cn('about')}>{about}</p>
      <List className={cn('list')} itemClassName={cn('list-item')}>
        {list}
      </List>
    </section>
  );
};

export default Techs;
