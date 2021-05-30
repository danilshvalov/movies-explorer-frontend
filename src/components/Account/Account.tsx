import {createCn} from 'bem-react-classname';
import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../Button/Button';
import {account as texts} from '../../utils/texts';
import accountImg from '../../images/account-avatar.svg';
import ColoredLink from '../ColoredLink/ColoredLink';
import {pageLinks} from '../../utils/config';

import './Account.css';

export type AccountProps = React.HTMLAttributes<HTMLDivElement>;

/** Элемент, перенаправляющий на страницу управления аккаунтом */
const Account: React.FC<AccountProps> = ({className, ...props}) => {
  const cn = createCn('account', className);
  return (
    <div {...props} className={cn()}>
      <Link
        component={ColoredLink}
        to={pageLinks.profile}
        className={cn('link')}
      >
        <Button className={cn('profile-button')}>
          {texts.buttons.account}
        </Button>
        {/** Иконка человечка */}
        <img
          className={cn('logo')}
          src={accountImg}
          alt={texts.accountLogo.alt}
        />
      </Link>
    </div>
  );
};

export default Account;
