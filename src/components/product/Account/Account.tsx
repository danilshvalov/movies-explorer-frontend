import {createCn} from 'bem-react-classname';
import React, {HTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
import {Link as GenericLink} from '@generic/Link/Link';
/* ---------------------------------- Utils --------------------------------- */
import {PAGE_LINKS} from '@utils/config';
/* --------------------------------- Images --------------------------------- */
import {ACCOUNT as TEXTS} from '@texts/product';
/* ---------------------------------- Texts --------------------------------- */
import images from '@images';
/* -------------------------------------------------------------------------- */
import './Account.css';

export type Props = HTMLAttributes<HTMLDivElement>;

/** Элемент, перенаправляющий на страницу управления аккаунтом */
export function Account({className, ...props}: Props): JSX.Element {
  const cn = createCn('account', className);
  return (
    <div {...props} className={cn()}>
      <Link component={GenericLink} to={PAGE_LINKS.profile} className={cn('link')}>
        <Button className={cn('profile-button')}>{TEXTS.buttons.account}</Button>
        {/** Иконка человечка */}
        <img className={cn('logo')} src={images.ACCOUNT_AVATAR} alt={TEXTS.accountLogo.alt} />
      </Link>
    </div>
  );
}

export default Account;
