import {withPropsClassNames} from '../../utils/utils';
import './List.css';

function List(props) {
  const className = withPropsClassNames(props.className, 'list');

  return <ul className={className}>{props.children}</ul>;
}

export default List;
