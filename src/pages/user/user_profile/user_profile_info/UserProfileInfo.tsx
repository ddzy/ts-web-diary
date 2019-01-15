import * as React from 'react';

import {
  InfoWrapper,
  InfoContent,
} from './style';


export interface IUserProfileInfoProps { };


const UserProfileInfo = React.memo<IUserProfileInfoProps>((
  props: IUserProfileInfoProps,
): JSX.Element => {

  return (
    <InfoWrapper>
      <InfoContent>
        个人信息展示区域
      </InfoContent>
    </InfoWrapper>
  );

});


export default UserProfileInfo;