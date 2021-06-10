import {createCn} from 'bem-react-classname';
import React from 'react';

import CurrentUserContext from '@contexts/CurrentUserContext';
import ProfileForm, {ProfileUpdateFunc} from './ProfileForm/ProfileForm';
import {profile as texts} from '@utils/texts';
import Button from '@Button/Button';
import Header from '@/Header';

import './Profile.css';

function getGreetingText(name: string | undefined) {
  return `Привет, ${name || 'друг'}!`;
}

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback изменения профиля */
  onProfileUpdate: ProfileUpdateFunc;
  onLogout: Function;
}

/** Секция с формой изменения профиля */
const Profile = ({className, onProfileUpdate, onLogout, ...props}: ProfileProps) => {
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
          {texts.subtext.exitLink}
        </Button>
      </span>
    </div>
  );
};

const ProfilePage = (props: ProfileProps) => (
  <>
    <Header />;
    <Profile {...props} />
  </>
);

export default ProfilePage;
