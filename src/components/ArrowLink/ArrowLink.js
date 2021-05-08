import {getOnlyDOMProps, withPropsClassNames} from '../../utils/utils';
import arrowLinkImg from '../../images/arrow-link.svg';
import './ArrowLink.css';

function ArrowLink(props) {
  const className = withPropsClassNames(props.className, 'arrow-link');

  return (
    <a {...getOnlyDOMProps(props)} className={className}>
      {props.children}
      <img className="arrow-link__picture" src={arrowLinkImg} />
    </a>
  );
}

export default ArrowLink;
