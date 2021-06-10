import {createCn} from 'bem-react-classname';
import React from 'react';
/* -------------------------------- Generics -------------------------------- */
import * as GenericButton from '@generic/Button/Button';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './SaveButton.css';

export type DOMProps = GenericButton.DOMProps;
export interface FunctionalProps {
  /** Флаг изначального состояния кнопки */
  checked?: boolean;
}
export type Props = DOMProps & FunctionalProps;

/** Кнопка сохранения */
export function SaveButton({className, checked = false, ...props}: Props): JSX.Element {
  const cn = createCn('save-button', className);
  return (
    <GenericButton.Button {...props} theme={Theme.Light} className={cn({checked})}>
      {!checked && 'Сохранить'}
    </GenericButton.Button>
  );
}

export default SaveButton;
