import {createCn} from 'bem-react-classname';
import {Link} from 'react-router-dom';

import logoImg from '@images/logo.svg';
import {PAGE_LINKS} from '@utils/config';
import {logo as texts} from '@utils/texts';
import ColoredLink from '@generic/ColoredLink/ColoredLink';

import './Logo.css';
import { forwardRef, ImgHTMLAttributes} from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

/** Логотип сайта */
const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({className, ...props}, ref) => {
    const cn = createCn('logo', className);
    return (
      /** При нажатии перенаправляем на главную страницу */
      <Link component={ColoredLink} to={PAGE_LINKS.main}>
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
