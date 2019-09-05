import * as React from 'react';
import {
  Upload,
  Avatar,
} from 'antd';

import {
  AvatarContainer,
  AvatarContent,
} from './style';


export interface IUserProfileInfoAvatarProps { };


const UserProfileInfoAvatar = React.memo<IUserProfileInfoAvatarProps>((
  props: IUserProfileInfoAvatarProps,
): JSX.Element => {

  return (
    <AvatarContainer>
      <AvatarContent>
        <Upload>
          <Avatar
            style={{
              width: 160,
              height: 160,
              cursor: 'pointer',
              lineHeight: '160px',
              fontSize: 28,
            }}
            icon="user"
            shape="square"
          />
        </Upload>
      </AvatarContent>
    </AvatarContainer>
  );

});


export default UserProfileInfoAvatar;