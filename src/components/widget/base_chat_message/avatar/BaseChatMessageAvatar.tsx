import * as React from 'react';
import {
  Avatar,
} from 'antd';

import {
  AvatarWrapper,
  AvatarMain,
} from './style';


export interface IBaseChatMessageAvatarProps {
};

const BaseChatMessageAvatar = React.memo((props: IBaseChatMessageAvatarProps) => {
  return (
    <AvatarWrapper>
      <AvatarMain>
        <Avatar
          icon={'user'}
        />
      </AvatarMain>
    </AvatarWrapper>
  );
});

export default BaseChatMessageAvatar;