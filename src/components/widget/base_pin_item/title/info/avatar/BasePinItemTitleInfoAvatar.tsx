import * as React from 'react';
import {
  Avatar,
} from 'antd';

import {
  AvatarWrapper,
  AvatarMain,
} from './style';


export interface IBasePinItemTitleInfoAvatarProps { };
export interface IBasePinItemTitleInfoAvatarState { }


const BasePinItemTitleInfoAvatar = React.memo((props: IBasePinItemTitleInfoAvatarProps) => {
  return (
    <AvatarWrapper>
      <AvatarMain>
        <Avatar
          icon="user"
          src={''}
          size="large"
        />
      </AvatarMain>
    </AvatarWrapper>
  );
});

export default BasePinItemTitleInfoAvatar;