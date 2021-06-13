import React, {
  HTMLAttributes,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
import Catch from '@generic/Catch/Catch';
/* ---------------------------------- Types --------------------------------- */
import {Theme, WithError} from 'types/types';
/* ---------------------------------- Texts --------------------------------- */
import {SAVED_MOVIES} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './ErrorBoundary.css';

const TEXTS = SAVED_MOVIES.errorBoundary;

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type FunctionalProps = WithError<Error>
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
        <p className={cn('text')}>{TEXTS.message}</p>
        <Button
          className={cn('button')}
          onClick={handleButtonClick}
          theme={Theme.Azure}
        >
          {TEXTS.button.text}
        </Button>
      </div>
    );
  }
  return <>{props.children}</>;
});

export default ErrorBoundary;
