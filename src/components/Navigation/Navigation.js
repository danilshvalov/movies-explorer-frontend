import './Navigation.css';
import {Route} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function Navigation(props) {
  return (
    <nav className="navigation">
      <Route path="/">
        <ul className="navigation__list">
          <li className="navigation__list-item">Фильмы</li>
          <li className="navigation__list-item">Сохранённые фильмы</li>
        </ul>
      </Route>
    </nav>
  );
}

export default Navigation;
