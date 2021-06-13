import {createCn} from 'bem-react-classname';
import React from 'react';
/* --------------------------------- Generic -------------------------------- */
import Button from '@generic/Button/Button';
/* ---------------------------------- Types --------------------------------- */
import {OnLogoutFunc, OnProfileUpdateFunc} from 'types/types';
/* ---------------------------------- Utils --------------------------------- */
import {PROFILE as TEXTS} from '@texts/product';
/* -------------------------------------------------------------------------- */
import Header from '@product/Header/Header';
/* -------------------------------- Contexts -------------------------------- */
import CurrentUserContext from '@contexts/CurrentUserContext';
/* ---------------------------------- Local --------------------------------- */
import ProfileForm from '@product/Profile/ProfileForm/ProfileForm';
/* -------------------------------------------------------------------------- */
import './Profile.css';

function getGreetingText(name: string | undefined) {
  return `Привет, ${name || 'друг'}!`;
}

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback изменения профиля */
  onProfileUpdate: OnProfileUpdateFunc;
  onLogout: OnLogoutFunc;
}

/** Секция с формой изменения профиля */
export function Profile({
  className, onProfileUpdate, onLogout, ...props
}: ProfileProps): JSX.Element {
  const currentUser = React.useContext(CurrentUserContext);
  const cn = createCn('profile', className);

  return (
    <div {...props} className={cn()}>
      <h1 className={cn('title')}>{getGreetingText(currentUser.name)}</h1>
      {/** Форма изменения профиля */}
      <ProfileForm className={cn('form')} onProfileUpdate={onProfileUpdate} />
      {/** Ссылка на выход из аккаунта */}
      <span className={cn('sub-text')}>
        <Button className={cn('exit-link')} onClick={() => onLogout()}>
          {TEXTS.subtext.exitLink}
        </Button>
      </span>
    </div>
  );
}

export function ProfilePage(props: ProfileProps): JSX.Element {
  return (
    <>
      <Header />;
      <Profile {...props} />
    </>
  );
}

export default ProfilePage;
