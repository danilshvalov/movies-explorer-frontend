import {createCn} from 'bem-react-classname';
import React from 'react';

import {parseTime, stringifyTime} from '../../utils/utils';
import PushButton from '../PushButton/PushButton';

import './MoviesCard.css';

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
  const [isChecked, setChecked] = React.useState(false);

  const handleSaveButtonClick = () => setChecked(!isChecked);

  const cn = createCn('movies-card', className);
  const saveButtonClass = cn('save-button', {checked: isChecked});

  const saveButtonText = isChecked ? '' : 'Сохранить';
  return (
    <div {...props} className={cn()}>
      <PushButton
        className={saveButtonClass}
        onClick={handleSaveButtonClick}
        theme="light"
      >
        {saveButtonText}
      </PushButton>
      <img className={cn('poster')} src={thumbnail} />
      <div className={cn('info')}>
        <p className={cn('name')}>{nameRU}</p>
        <p className={cn('duration')}>{stringifyTime(parseTime(duration))}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
