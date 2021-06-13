import React, {
  HTMLAttributes, PropsWithChildren, useState, useEffect,
} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
import Catch from '@generic/Catch/Catch';
/* ---------------------------------- Types --------------------------------- */
import {Theme, WithError} from 'types/types';
/* -------------------------------------------------------------------------- */
import './ErrorBoundary.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export interface FunctionalProps extends WithError<Error> {
  errorHandler: () => void;
}
export type Props = PropsWithChildren<DOMProps & FunctionalProps>;

function errorHandler(error: Error, info: React.ErrorInfo) {
  console.log(error, info);
}

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
        <p className={cn('text')}>Не удалось загрузить фильмы</p>
        <Button className={cn('button')} onClick={handleButtonClick} theme={Theme.Azure}>
          {/* TODO перенести в constants */}
          Попробовать снова
        </Button>
      </div>
    );
  }
  return <>{props.children}</>;
}, errorHandler);

export default ErrorBoundary;
