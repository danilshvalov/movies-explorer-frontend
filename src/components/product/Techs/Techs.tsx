import {createCn} from 'bem-react-classname';
import {HTMLAttributes} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
/* --------------------------------- Generic -------------------------------- */
import List from '@generic/List/List';
import SectionHeader from '@generic/SectionHeader/SectionHeader';
/* ---------------------------------- Utils --------------------------------- */
import {techs as texts} from '@utils/texts';
/* -------------------------------------------------------------------------- */
import './Techs.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Секция с используемыми технологиями */
export function Techs({className, ...props}: Props): JSX.Element {
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
}

export default Techs;
