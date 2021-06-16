import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
/* -------------------------------------------------------------------------- */
import './InfoTicket.css';

export interface Props
  extends HTMLAttributes<HTMLDivElement> {
  /** Текст заголовка */
  title: string;
  /** Текст содержания */
  about: string;
}

/** Компонент-карточка с названием и какой-либо информацией */
export function InfoTicket({
  title,
  about,
  className,
  ...props
}: Props): JSX.Element {
  const cn = createCn('info-ticket', className);
  return (
    <div {...props} className={cn()}>
      <h3 className={cn('title')}>{title}</h3>
      <p className={cn('about')}>{about}</p>
    </div>
  );
}

export default InfoTicket;
