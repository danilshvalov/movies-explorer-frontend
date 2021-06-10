import React from 'react';
import Preloader, {PreloaderProps} from '@/Preloader';

export interface PreloaderWrapperProps extends PreloaderProps {
  isLoading: boolean;
}

function PreloaderWrapper({isLoading, ...props}: React.PropsWithChildren<PreloaderWrapperProps>) {
  return isLoading ? <Preloader {...(props as PreloaderProps)} /> : <>{props.children}</>;
}

export default PreloaderWrapper;
