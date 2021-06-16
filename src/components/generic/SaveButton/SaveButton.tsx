import React, {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import * as GenericButton from '@generic/Button/Button';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from 'types/types';
/* -------------------------------------------------------------------------- */
import './SaveButton.css';

export type DOMProps = GenericButton.DOMProps;
export interface FunctionalProps extends GenericButton.FunctionalProps {
  checked?: boolean;
}
export type Props = DOMProps & FunctionalProps;

/**
 * Кнопка сохранения
 *
 * @see {@link GenericButton.Button Button}
 * */
export function SaveButton({
  className,
  checked = false,
  isLoading = false,
  ...props
}: Props): JSX.Element {
  const cn = createCn('save-button', className);
  return (
    <GenericButton.Button
      {...props}
      theme={Theme.Light}
      className={cn({
        checked,
        loading: isLoading && checked,
      })}
    >
      {!checked && props.children}
    </GenericButton.Button>
  );
}

export default SaveButton;
