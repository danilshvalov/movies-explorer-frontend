import React, {PropsWithChildren} from 'react';
import {createCn} from 'bem-react-classname';
/* --------------------------------- Generic -------------------------------- */
import * as GenericPreloader from '@generic/Preloader/Preloader';
/* -------------------------------------------------------------------------- */
import './PreloaderWrapper.css';

export interface FunctionalProps {
  isLoading: boolean;
}
export type DOMProps = GenericPreloader.DOMProps;
export type Props = PropsWithChildren<
  DOMProps & FunctionalProps
>;

function PreloaderWrapper({
  className,
  ...props
}: Props): JSX.Element {
  const cn = createCn('preloader-wrapper', className);

  return props.isLoading ? (
    <GenericPreloader.Preloader
      {...(props as GenericPreloader.Props)}
      className={cn()}
    />
  ) : (
    <>{props.children}</>
  );
}

export default PreloaderWrapper;
