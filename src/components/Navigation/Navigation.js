import './Navigation.css';
import {Route} from 'react-router-dom';
import List from '../List/List';

// eslint-disable-next-line no-unused-vars
function Navigation(props) {
  return (
    <nav className="navigation">
      <Route path="/">
        <List className="navigation__list" itemClassName="navigation__list-item">
          <a href="navigation__link">Фильмы</a>
          <a href="navigation__link">Сохранённые фильмы</a>
        </List>
      </Route>
    </nav>
  );
}

export default Navigation;
