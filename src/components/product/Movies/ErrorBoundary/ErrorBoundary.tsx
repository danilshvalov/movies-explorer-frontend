import Catch from '@generic/Catch/Catch';
import React, {
  HTMLAttributes, PropsWithChildren, useState, useEffect,
} from 'react';
import Button from '@generic/Button/Button';
import {createCn} from 'bem-react-classname';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps {
  error?: Error;
}
export type Props = PropsWithChildren<DOMProps & FunctionalProps>;

export const ErrorBoundary = Catch((props: Props): JSX.Element => {
  const cn = createCn('all-movies-error');

  const [currentError, setCurrentError] = useState(props.error);

  useEffect(() => {
    setCurrentError(props.error);
  }, [props.error]);

  function handleButtonClick() {
    setCurrentError(undefined);
  }

  if (currentError) {
    return (
      <div className={cn()}>
        {/* TODO Добавить текст */}
        <Button className={cn('button')} onClick={handleButtonClick}>
          {/* TODO перенести в constants */}
          Попробовать снова
        </Button>
      </div>
    );
  }
  return <>{props.children}</>;
});

export default ErrorBoundary;
