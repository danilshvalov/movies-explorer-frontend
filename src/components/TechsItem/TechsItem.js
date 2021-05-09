import {concatClassNames} from '../../utils/utils';
import './TechsItem.css';

function TechsItem(props) {
  const className = concatClassNames(props.className, 'techs-item');

  return <li className={className}>{props.children}</li>;
}

export default TechsItem;
