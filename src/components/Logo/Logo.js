import classNames from 'classnames';
import logo from '../../images/logo.svg';

import './Logo.css';

function Logo(props) {
  const className = classNames('logo', props.className);
  return <img className={className} src={logo} />;
}

export default Logo;
