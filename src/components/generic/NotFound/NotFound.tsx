import {createCn} from 'bem-react-classname';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {useLastLocation} from 'react-router-last-location';

import {PAGE_LINKS} from '@utils/config';
import Button from '@generic/Button/Button';
import {notFound as texts} from '@utils/texts';

import './NotFound.css';

/** Страница 404 */
const NotFound = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const cn = createCn('not-found', props.className);

  /** История и последняя посещенная ссылка на сайте */
  const history = useHistory();
  const lastLocation = useLastLocation();

  const handleBackButtonClick = () => {
    /** Если пользователь уже был на сайте и провалился не туда - возвращаем на пред. страницу */
    if (lastLocation) {
      history.goBack();
    } else {
      /** Иначе, чтобы не вернуть на страницу другого сайта, перекидываем на главную */
      history.push(PAGE_LINKS.main);
    }
  };
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1 className={cn('error-code')}>{texts.code}</h1>
        <p className={cn('description')}>{texts.description}</p>
      </div>
      {/** Кнопка возвращения пользователя */}
      <Button className={cn('button')} onClick={handleBackButtonClick}>
        {texts.buttonText}
      </Button>
    </div>
  );
};

export default NotFound;
