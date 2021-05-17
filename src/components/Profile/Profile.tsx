import {createCn} from 'bem-react-classname';
import React from 'react';
import ProfileForm, {ProfileUpdateFunc} from '../ProfileForm/ProfileForm';

import './Profile.css';

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  onProfileUpdate: ProfileUpdateFunc;
}

const Profile: React.FC<ProfileProps> = ({
  className,
  onProfileUpdate,
  ...props
}) => {
  const cn = createCn('profile', className);

  return (
    <div {...props} className={cn()}>
      <ProfileForm onProfileUpdate={onProfileUpdate} />
    </div>
  );
};

export default Profile;
