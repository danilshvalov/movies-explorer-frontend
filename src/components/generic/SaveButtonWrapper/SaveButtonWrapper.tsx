import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import {IMovie} from 'types/types';
import MoviesCard, {DataProps as MoviesCardDataProps} from '@/MoviesCard/MoviesCard';
import SaveButton from '@/SaveButton';

import './SaveButtonWrapper.css';

/**
 * Обертка над кнопкой сохранения
 *
 * position: absolute => у родителя должен быть position relative
 *
 * @see SaveButton
 */
export type DataProps = MoviesCardDataProps;
export interface FunctionalProps {
  onSave?: (data: IMovie) => any;
  onDelete?: (data: IMovie) => any;
}
export type DOMProps = React.HTMLAttributes<HTMLDivElement>;

export type Props = FunctionalProps & DOMProps & DataProps;

export default function SaveButtonWrapper(props: Props) {
  const cn = createCn('save-button-wrapper', props.className);

  const [isHovered, setIsHovered] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(props.isSaved);

  function handleClick() {
    if (!isSaved) {
      props.onSave?.({...(props as IMovie), isSaved});
    } else {
      props.onDelete?.({...(props as IMovie), isSaved});
    }
    setIsSaved(!isSaved);
  }

  React.useEffect(() => {
    console.log(props.isSaved);
  }, [props.isSaved]);

  return (
    <div
      {...filterInvalidDOMProps(props)}
      className={cn()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MoviesCard {...(props as DataProps)} />
      {(props.isSaved || isHovered) && (
        <SaveButton className={cn('button')} checked={isSaved} onClick={handleClick}>
          {/* TODO переделать на константу */}
          Сохранить
        </SaveButton>
      )}
    </div>
  );
}
