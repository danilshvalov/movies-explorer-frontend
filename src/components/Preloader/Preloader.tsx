import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';

import './Preloader.css';

export type PreloaderProps = React.HTMLAttributes<HTMLDivElement>;

/** Компонент-заглушка во время загрузки данных */
const Preloader = ({className, ...props}: PreloaderProps) => {
  const cn = createCn('preloader', className);
  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <div className={cn('container')}>
        <span className={cn('round')} />
      </div>
    </div>
  );
};

export default Preloader;
