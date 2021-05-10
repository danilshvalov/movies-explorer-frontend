import classNames from 'classnames';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import arrowLinkImg from '../../images/arrow-link.svg';
import './ArrowLink.css';

function ArrowLink(props) {
  const className = classNames('arrow-link', props.className);

  return (
    <a {...filterInvalidDOMProps(props)} className={className}>
      {props.children}
      <img className="arrow-link__picture" src={arrowLinkImg} />
    </a>
  );
}

export default ArrowLink;
