import {createCn} from 'bem-react-classname';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';

import './ColoredLink.css';

export type ColoredLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ColoredLink: React.FC<ColoredLinkProps> = ({className, ...props}) => {
  const cn = createCn('colored-link', className);

  return (
    <a {...filterInvalidDOMProps(props)} className={cn()}>
      {props.children}
    </a>
  );
};

export default ColoredLink;
