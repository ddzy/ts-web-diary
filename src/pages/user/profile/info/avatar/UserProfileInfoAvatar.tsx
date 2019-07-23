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
              width: '100%',
              height: '100%',
              cursor: 'pointer',
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