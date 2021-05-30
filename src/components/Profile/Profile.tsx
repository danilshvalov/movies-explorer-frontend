import {createCn} from 'bem-react-classname';
import React from 'react';
import {Link} from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ColoredLink from '../ColoredLink/ColoredLink';
import ProfileForm, {ProfileUpdateFunc} from '../ProfileForm/ProfileForm';
import {profile as texts} from '../../utils/texts';
import {pageLinks} from '../../utils/config';

import './Profile.css';

function getGreetingText(name: string | undefined) {
  return `Привет, ${name || 'друг'}!`;
}

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** callback изменения профиля */
  onProfileUpdate: ProfileUpdateFunc;
}

/** Секция с формой изменения профиля */
const Profile = ({className, onProfileUpdate, ...props}: ProfileProps) => {
  const currentUser = React.useContext(CurrentUserContext);
  const cn = createCn('profile', className);

  return (
    <div {...props} className={cn()}>
      <h1 className={cn('title')}>{getGreetingText(currentUser.name)}</h1>
      {/** Форма изменения профиля */}
      <ProfileForm className={cn('form')} onProfileUpdate={onProfileUpdate} />
      {/** Ссылка на выход из аккаунта */}
      <span className={cn('sub-text')}>
        <Link
          component={ColoredLink}
          to={pageLinks.main}
          className={cn('exit-link')}
        >
          {texts.subtext.exitLink}
        </Link>
      </span>
    </div>
  );
};

export default Profile;
