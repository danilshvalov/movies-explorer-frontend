import {concatClassNames} from '../../utils/utils';
import './ListItem.css';

function ListItem(props) {
  const className = concatClassNames(props.className, 'list-item');

  return <ul className={className}>{props.children}</ul>;
}

export default ListItem;
