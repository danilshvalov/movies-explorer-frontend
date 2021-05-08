import {withPropsClassNames} from '../../utils/utils';
import './Portfolio.css';
import List from '../List/List';
import ArrowLink from '../ArrowLink/ArrowLink';
import ListItem from '../ListItem/ListItem';

// TODO переделать в массив

function Portfolio(props) {
  const className = withPropsClassNames(props.className, 'portfolio');
  return (
    <section className={className}>
      <h3 className="portfolio__header">Портфолио</h3>
      <List className="portfolio__list">
        <ListItem className="portfolio__list-item">
          <ArrowLink className="portfolio__link">Статичный сайт</ArrowLink>
        </ListItem>
        <ListItem className="portfolio__list-item">
          <ArrowLink className="portfolio__link">Адаптивный сайт</ArrowLink>
        </ListItem>
        <ListItem className="portfolio__list-item">
          <ArrowLink className="portfolio__link">Одностраничное приложение</ArrowLink>
        </ListItem>
      </List>
    </section>
  );
}

export default Portfolio;
