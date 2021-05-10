import filterInvalidDOMProps from 'filter-invalid-dom-props';
import classNames from 'classnames';
import './SectionHeader.css';

function SectionHeader(props) {
  const className = classNames('section-header', props.className);
  return (
    <h2 {...filterInvalidDOMProps(props)} className={className}>
      {props.children}
    </h2>
  );
}

export default SectionHeader;
