import {createCn} from 'bem-react-classname';
import React from 'react';
import {OnDeleteFunc} from 'types/MoviesCard';
import {IMovie} from 'types/types';

import DeleteButton from '@generic/DeleteButton/DeleteButton';
import MoviesCard, {DataProps as MoviesCardDataProps} from '@generic/MoviesCard/MoviesCard';

/**
 * Обертка над кнопкой удаления
 * position: absolute => у родителя должен быть position relative
 * @see DeleteButton
 */
interface FunctionalProps extends MoviesCardDataProps {
  onDelete?: OnDeleteFunc;
}

type DOMProps = React.HTMLAttributes<HTMLDivElement>;

type Props = FunctionalProps & DOMProps;
/** @deprecated */
// REMOVE
export default function DeleteButtonWrapper(props: Props) {
  const cn = createCn('delete-button-wrapper', props.className);

  const [isHovered, setIsHovered] = React.useState(false);

  function handleClick() {
    props.onDelete?.(props as IMovie);
  }

  return (
    <div {...(props as DOMProps)} className={cn()}>
      <MoviesCard {...props} />
      <DeleteButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn('button', {hovered: isHovered})}
        onClick={handleClick}
      />
    </div>
  );
}
