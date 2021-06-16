import {createCn} from 'bem-react-classname';
import React from 'react';
import {useHistory} from 'react-router-dom';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Texts --------------------------------- */
import {NOT_FOUND as TEXTS} from '@texts/product';
/* -------------------------------------------------------------------------- */
import './NotFound.css';

/** Страница 404 */
export function NotFound(
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element {
  const cn = createCn('not-found', props.className);

  const history = useHistory();

  const handleBackButtonClick = () => {
    history.push(PAGE_LINKS.main);
  };
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1 className={cn('error-code')}>{TEXTS.code}</h1>
        <p className={cn('description')}>
          {TEXTS.description}
        </p>
      </div>
      {/** Кнопка возвращения пользователя */}
      <Button
        className={cn('button')}
        onClick={handleBackButtonClick}
      >
        {TEXTS.buttonText}
      </Button>
    </div>
  );
}

export default NotFound;
