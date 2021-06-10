import {createCn} from 'bem-react-classname';
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

import {techs as texts} from '@utils/texts';
import List from '@generic/List/List';
import SectionHeader from '@SectionHeader/SectionHeader';

import './Techs.css';

export type TechsProps = React.HTMLAttributes<HTMLDivElement>;

/** Секция с используемыми технологиями */
const Techs = ({className, ...props}: TechsProps) => {
  const cn = createCn('techs', className);
  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <div className={cn('container')}>
        <SectionHeader className={cn('header')}>{texts.header}</SectionHeader>
        <h2 className={cn('title')}>{`${texts.list.length} технологий`}</h2>
        {/** Краткое описание */}
        <p className={cn('about')}>{texts.about}</p>
        {/** Список технологий */}
        <List className={cn('list')} itemClassName={cn('list-item')}>
          {texts.list}
        </List>
      </div>
    </section>
  );
};

export default Techs;
