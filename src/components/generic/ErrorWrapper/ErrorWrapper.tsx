import React, {PropsWithChildren, ComponentType} from 'react';

export interface FallbackComponentProps {
  isError?: boolean;
  onReset?: () => void;
}

export interface FunctionalProps extends FallbackComponentProps {
  fallback: ComponentType<FallbackComponentProps>;
}
export type Props = PropsWithChildren<FunctionalProps>;

export function ErrorWrapper({isError, onReset, ...props}: Props): JSX.Element {
  return (
    <>
      {isError
        ? React.createElement(props.fallback, {isError, onReset})
        : props.children}
    </>
  );
}

export default ErrorWrapper;
