import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {parseTime, stringifyTime} from '../../utils/utils';
import {moviesCard as texts} from '../../utils/texts';
import {ButtonProps} from '../Button/Button';

import './MoviesCard.css';

export interface CardButtonProps extends ButtonProps {
  checked?: boolean;
  hidden?: boolean;
}

export interface MoviesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thumbnail: any;
  duration: number;
  nameRU: string;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  className,
  duration,
  thumbnail,
  nameRU,
  ...props
}) => {
  const cn = createCn('movies-card', className);

  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <img className={cn('poster')} src={thumbnail} alt={texts.img.alt} />
      <div className={cn('info')}>
        <p className={cn('name')}>{nameRU}</p>
        <p className={cn('duration')}>{stringifyTime(parseTime(duration))}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
