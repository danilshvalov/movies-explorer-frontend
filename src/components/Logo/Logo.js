import {concatClassNames} from '../../utils/utils';
import logo from '../../images/logo.svg';

import './Logo.css';

function Logo(props) {
  const className = concatClassNames(props.className, 'logo');
  return <img className={className} src={logo} />;
}

export default Logo;
