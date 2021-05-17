import {createCn} from 'bem-react-classname';
import React from 'react';
import {useHistory} from 'react-router';
import {useLastLocation} from 'react-router-last-location';
import {pageLinks} from '../../utils/config';

import Button from '../Button/Button';
import {notFound as texts} from '../../utils/texts';

import './NotFound.css';

const NotFound = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const cn = createCn('not-found', props.className);

  const history = useHistory();
  const lastLocation = useLastLocation();

  const handleBackButtonClick = () => {
    if (lastLocation) {
      history.goBack();
    } else {
      history.push(pageLinks.main);
    }
  };
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1 className={cn('error-code')}>{texts.code}</h1>
        <p className={cn('description')}>{texts.description}</p>
      </div>
      <Button className={cn('button')} onClick={handleBackButtonClick}>
        {texts.buttonText}
      </Button>
    </div>
  );
};

export default NotFound;
