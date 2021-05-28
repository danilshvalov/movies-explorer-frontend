import {createCn} from 'bem-react-classname';
import React from 'react';
import {Link} from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContexts';
import ColoredLink from '../ColoredLink/ColoredLink';
import ProfileForm, {ProfileUpdateFunc} from '../ProfileForm/ProfileForm';
import {profile as texts} from '../../utils/texts';
import {pageLinks} from '../../utils/config';

import './Profile.css';

const getGreetingText = (name: string) => `Привет, ${name}!`;

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  onProfileUpdate: ProfileUpdateFunc;
}

const Profile: React.FC<ProfileProps> = ({
  className,
  onProfileUpdate,
  ...props
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const cn = createCn('profile', className);

  return (
    <div {...props} className={cn()}>
      <h1 className={cn('title')}>
        {getGreetingText(currentUser.name as string)}
      </h1>
      <ProfileForm className={cn('form')} onProfileUpdate={onProfileUpdate} />
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
