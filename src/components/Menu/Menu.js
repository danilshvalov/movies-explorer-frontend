import classNames from 'classnames';
import './Menu.css';

function Menu(props) {
  const className = classNames('menu', props.className);
  return (
    <div className={className}>
      <div className="menu__container">{props.children}</div>
    </div>
  );
}

export default Menu;
