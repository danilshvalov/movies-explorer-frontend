import {createCn} from 'bem-react-classname';
import {Link} from 'react-router-dom';
import {forwardRef, ImgHTMLAttributes} from 'react';
/* -------------------------------- Generics -------------------------------- */
import {Link as GenericLink} from '@generic/Link/Link';
/* --------------------------------- Images --------------------------------- */
import images from '@images';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* ---------------------------------- Texts --------------------------------- */
import {LOGO as TEXTS} from '@texts/generic';
/* -------------------------------------------------------------------------- */
import './Logo.css';

export type DOMProps = ImgHTMLAttributes<HTMLImageElement>;
export type Props = DOMProps;

/** Логотип сайта */
export const Logo = forwardRef<HTMLImageElement, Props>(({className, ...props}, ref) => {
  const cn = createCn('logo', className);
  return (
    /** При нажатии перенаправляем на главную страницу */
    <Link component={GenericLink} to={PAGE_LINKS.main}>
      <img {...props} className={cn()} ref={ref} src={images.LOGO} alt={TEXTS.img.alt} />
    </Link>
  );
});

export default Logo;
