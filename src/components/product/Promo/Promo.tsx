import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {HTMLAttributes} from 'react';
/* ---------------------------------- Utils --------------------------------- */
import {promo as texts} from '@utils/texts';
/* --------------------------------- Product -------------------------------- */
import NavTab from '@product/NavTab/NavTab';
/* -------------------------------------------------------------------------- */
import './Promo.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type Props = DOMProps;

/** Приветствующая секция с навигацией по странице */
export function Promo({className, ...props}: Props): JSX.Element {
  const cn = createCn('promo', className);
  return (
    <section {...filterInvalidDOMProps(props)} className={cn()}>
      <h1 className={cn('title')}>{texts.title}</h1>
      <NavTab className={cn('nav-tab')} />
    </section>
  );
}

export default Promo;
