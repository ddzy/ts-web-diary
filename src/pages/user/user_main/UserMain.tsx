import * as React from 'react';

import {
  MainContainer,
  MainContent,
} from './style';

export interface IUserProfileProps { };


const UserProfile = React.memo<IUserProfileProps>((
  props: IUserProfileProps,
): JSX.Element => {

  return (
    <MainContainer>
      <MainContent>
        个人主区域
      </MainContent>
    </MainContainer>
  );

});


export default UserProfile;