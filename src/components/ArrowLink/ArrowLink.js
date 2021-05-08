import {getOnlyDOMProps, withPropsClassNames} from '../../utils/utils';
import './ArrowLink.css';

function ArrowLink(props) {
  const className = withPropsClassNames(props.className, 'arrow-link');

  return (
    <a {...getOnlyDOMProps(props)} className={className}>
      {props.children}
    </a>
  );
}

export default ArrowLink;
