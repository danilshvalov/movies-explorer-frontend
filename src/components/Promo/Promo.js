import {title} from '../../texts/promo';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">{title}</h1>
      <NavTab className="promo__nav-tab"></NavTab>
    </section>
  );
}

export default Promo;
