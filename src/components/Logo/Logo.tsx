import {createCn} from 'bem-react-classname';
import React from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../images/logo.svg';
import {pageLinks} from '../../utils/config';
import {logo as texts} from '../../utils/texts';
import ColoredLink from '../ColoredLink/ColoredLink';

import './Logo.css';

export type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

/** Логотип сайта */
const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('logo', className);
    return (
      /** При нажатии перенаправляем на главную страницу */
      <Link component={ColoredLink} to={pageLinks.main}>
        <img
          {...props}
          className={cn()}
          ref={ref}
          src={logoImg}
          alt={texts.img.alt}
        />
      </Link>
    );
  },
);

export default Logo;
