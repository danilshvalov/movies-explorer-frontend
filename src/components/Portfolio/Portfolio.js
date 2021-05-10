import classNames from 'classnames';
import './Portfolio.css';
import List from '../List/List';
import ArrowLink from '../ArrowLink/ArrowLink';

// TODO переделать в массив

function Portfolio(props) {
  const className = classNames('portfolio', props.className);
  return (
    <section className={className}>
      <h3 className="portfolio__header">Портфолио</h3>
      <List className="portfolio__list" itemClassName="portfolio__list-item">
        <ArrowLink className="portfolio__link">Статичный сайт</ArrowLink>
        <ArrowLink className="portfolio__link">Адаптивный сайт</ArrowLink>
        <ArrowLink className="portfolio__link">Одностраничное приложение</ArrowLink>
      </List>
    </section>
  );
}

export default Portfolio;
