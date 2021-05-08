import {withPropsClassNames} from '../../utils/utils';
import './ListItem.css';

function ListItem(props) {
  const className = withPropsClassNames(props.className, 'list-item');

  return <ul className={className}>{props.children}</ul>;
}

export default ListItem;
