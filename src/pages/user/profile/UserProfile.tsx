import * as React from 'react';

import {
  ProfileContainer,
  ProfileMain,
} from './style';
import UserProfileCover from './cover/UserProfileCover';
import UserProfileInfo from './info/UserProfileInfo';


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