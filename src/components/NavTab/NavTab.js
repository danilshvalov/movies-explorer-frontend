import {concatClassNames} from '../../utils/utils';
import PushButton from '../PushButton/PushButton';
import './NavTab.css';

// eslint-disable-next-line no-unused-vars
function NavTab(props) {
  const className = concatClassNames(props.className, 'nav-tab');
  return (
    <ul className={className}>
      <li className="nav-tab__item">
        <PushButton className="nav-tab__button">О проекте</PushButton>
      </li>
      <li className="nav-tab__item">
        <PushButton className="nav-tab__button">Технологии</PushButton>
      </li>
      <li className="nav-tab__item">
        <PushButton className="nav-tab__button">Студент</PushButton>
      </li>
    </ul>
  );
}

export default NavTab;
