import {createCn} from 'bem-react-classname';
import React from 'react';
import {Link, LinkProps} from 'react-router-dom';
import './ColoredLink.css';

export interface ColoredLinkProps extends LinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const ColoredLink: React.FC<ColoredLinkProps> = ({className, external = false, ...props}) => {
  const cn = createCn('colored-link', className);

  return external ? (
    <a {...props} href={props.to as string} className={cn()}>
      {props.children}
    </a>
  ) : (
    <Link {...props} className={cn()}>
      {props.children}
    </Link>
  );
};

export default ColoredLink;
