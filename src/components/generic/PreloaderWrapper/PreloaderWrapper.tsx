import React, {PropsWithChildren, useEffect, useState} from 'react';
/* --------------------------------- Generic -------------------------------- */
import * as GenericPreloader from '@generic/Preloader/Preloader';
/* -------------------------------------------------------------------------- */

export interface FunctionalProps {
  isLoading: boolean;
}
export type DOMProps = GenericPreloader.DOMProps;
export type Props = PropsWithChildren<DOMProps & FunctionalProps>;

function PreloaderWrapper(props: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(props.isLoading);

  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading]);

  return isLoading ? (
    <GenericPreloader.Preloader {...(props as GenericPreloader.Props)} />
  ) : (
    <>{props.children}</>
  );
}

export default PreloaderWrapper;
