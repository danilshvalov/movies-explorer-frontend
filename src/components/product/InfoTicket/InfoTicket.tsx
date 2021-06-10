import {createCn} from 'bem-react-classname';
import React from 'react';

import './InfoTicket.css';

export interface InfoTicketProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Текст заголовка */
  title: string;
  /** Текст содержания */
  about: string;
}

/** Компонент-карточка с названием и какой-либо информацией */
const InfoTicket: React.FC<InfoTicketProps> = ({
  title,
  about,
  className,
  ...props
}) => {
  const cn = createCn('info-ticket', className);
  return (
    <div {...props} className={cn()}>
      <h3 className={cn('title')}>{title}</h3>
      <p className={cn('about')}>{about}</p>
    </div>
  );
};

export default InfoTicket;
