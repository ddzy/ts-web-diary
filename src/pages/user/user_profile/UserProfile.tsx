import * as React from 'react';

import {
  ProfileContainer,
  ProfileMain,
} from './style';
import UserProfileCover from './user_profile_cover/UserProfileCover';
import UserProfileInfo from './user_profile_info/UserProfileInfo';


export interface IUserProfileProps { };


const UserProfile = React.memo<IUserProfileProps>((
  props: IUserProfileProps,
): JSX.Element => {

  return (
    <ProfileContainer>
      <ProfileMain>
        <UserProfileCover />
        <UserProfileInfo />
      </ProfileMain>
    </ProfileContainer>
  );

});


export default UserProfile;