import {createCn} from 'bem-react-classname';
import React from 'react';

import logo from '../../images/logo.svg';

import './Logo.css';

export type ILogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Logo: React.FC<ILogoProps> = (props) => {
  const cn = createCn('logo', props.className);
  return <img className={cn()} src={logo} />;
};

export default Logo;
