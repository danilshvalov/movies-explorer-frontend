import {createCn} from 'bem-react-classname';
import {HTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
/* -------------------------------- Generics -------------------------------- */
import Button from '@generic/Button/Button';
import {Link as GenericLink} from '@generic/Link/Link';
/* ---------------------------------- Utils --------------------------------- */
import {account as texts} from '@utils/texts';
import {PAGE_LINKS} from '@utils/config';
/* --------------------------------- Images --------------------------------- */
import accountImg from '@images/account-avatar.svg';
/* -------------------------------------------------------------------------- */
import './Account.css';

export type DOMProps = HTMLAttributes<HTMLDivElement>;
export type AccountProps = DOMProps;

/** Элемент, перенаправляющий на страницу управления аккаунтом */
export function Account({className, ...props}: AccountProps): JSX.Element {
  const cn = createCn('account', className);
  return (
    <div {...props} className={cn()}>
      <Link component={GenericLink} to={PAGE_LINKS.profile} className={cn('link')}>
        <Button className={cn('profile-button')}>{texts.buttons.account}</Button>
        {/** Иконка человечка */}
        <img className={cn('logo')} src={accountImg} alt={texts.accountLogo.alt} />
      </Link>
    </div>
  );
}

export default Account;
