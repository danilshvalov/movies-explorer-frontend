import classNames from 'classnames';
import './TechsItem.css';

function TechsItem(props) {
  const className = classNames('techs-item', props.className);

  return <li className={className}>{props.children}</li>;
}

export default TechsItem;
