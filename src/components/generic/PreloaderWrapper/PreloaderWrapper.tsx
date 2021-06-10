import {PropsWithChildren} from 'react';
/* --------------------------------- Generic -------------------------------- */
import * as GenericPreloader from '@generic/Preloader/Preloader';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  isLoading: boolean;
}
export type DOMProps = GenericPreloader.DOMProps;
export type Props = PropsWithChildren<DOMProps & FunctionalProps>;

function PreloaderWrapper({isLoading, ...props}: Props): JSX.Element {
  return isLoading ? (
    <GenericPreloader.Preloader {...(props as GenericPreloader.Props)} />
  ) : (
    <>{props.children}</>
  );
}

export default PreloaderWrapper;
