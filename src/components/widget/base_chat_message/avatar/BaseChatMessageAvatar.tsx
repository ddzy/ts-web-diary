import * as React from 'react';
import {
  Avatar,
} from 'antd';

import {
  AvatarWrapper,
  AvatarMain,
} from './style';
import { IBasicChatMessgaeType } from 'pages/basic.types';


export interface IBaseChatMessageAvatarProps {
  // ? 消息具体内容
  chatMessageInfo: {
    id: string,
    avatar: string,
    name: string,
    time: string,
    content: string,
    content_type: IBasicChatMessgaeType,
  };
};

const BaseChatMessageAvatar = React.memo((props: IBaseChatMessageAvatarProps) => {
  return (
    <AvatarWrapper>
      <AvatarMain>
        <Avatar
          icon="user"
          src={props.chatMessageInfo.avatar}
        />
      </AvatarMain>
    </AvatarWrapper>
  );
});

export default BaseChatMessageAvatar;