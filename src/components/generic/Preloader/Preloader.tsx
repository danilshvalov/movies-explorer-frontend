import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {createCn} from 'bem-react-classname';
/* -------------------------------------------------------------------------- */
import './Preloader.css';

export type DOMProps = React.HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Компонент-заглушка во время загрузки данных */
export function Preloader({className, ...props}: Props): JSX.Element {
  const cn = createCn('preloader', className);
  return (
    <div {...filterInvalidDOMProps(props)} className={cn()}>
      <div className={cn('container')}>
        <span className={cn('round')} />
      </div>
    </div>
  );
}

export default Preloader;
