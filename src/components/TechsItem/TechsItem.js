import {withPropsClassNames} from '../../utils/utils';
import './TechsItem.css';

function TechsItem(props) {
  const className = withPropsClassNames(props.className, 'techs-item');

  return <li className={className}>{props.children}</li>;
}

export default TechsItem;
