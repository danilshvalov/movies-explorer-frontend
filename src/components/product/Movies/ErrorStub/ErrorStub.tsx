import React, {HTMLAttributes} from 'react';
import {createCn} from 'bem-react-classname';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
import {FallbackComponentProps} from '@generic/ErrorWrapper/ErrorWrapper';
/* ---------------------------------- Types --------------------------------- */
import {Theme} from '@types-src/types';
/* ---------------------------------- Texts --------------------------------- */
import {SAVED_MOVIES} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './ErrorStub.css';

const TEXTS = SAVED_MOVIES.errorBoundary;

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type FunctionalProps = FallbackComponentProps;
export type Props = DOMProps & FunctionalProps;

export const ErrorStub = (props: Props): JSX.Element => {
  const cn = createCn('all-movies-error');

  return (
    <div className={cn()}>
      <p className={cn('text')}>{TEXTS.message}</p>
      <Button
        className={cn('button')}
        onClick={props.onReset}
        theme={Theme.Azure}
      >
        {TEXTS.button.text}
      </Button>
    </div>
  );
};

export default ErrorStub;
