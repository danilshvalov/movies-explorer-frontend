import {concatClassNames, getOnlyDOMProps} from '../../utils/utils';
import './SectionHeader.css';

function SectionHeader(props) {
  const className = concatClassNames(props.className, 'section-header');
  return (
    <h2 {...getOnlyDOMProps(props)} className={className}>
      {props.children}
    </h2>
  );
}

export default SectionHeader;
