import * as React from 'react';

import {
  MessageWrapper,
  MessageMain,
} from './style';
import BaseChatMessageAvatar from './avatar/BaseChatMessageAvatar';
import BaseChatMessageInfo from './info/BaseChatMessageInfo';
import { IBasicChatMessgaeType } from 'pages/basic.types';


export interface IBaseChatMessageProps {
  // ? 是否为发送方
  isSend: boolean;
  // ? 聊天信息
  chatMessageInfo: {
    id: string,
    avatar: string,
    name: string,
    time: string,
    content: string,
    content_type: IBasicChatMessgaeType,
  };
};

const BaseChatMessage = React.memo((props: IBaseChatMessageProps) => {
  return (
    <MessageWrapper isSend={props.isSend}>
      <MessageMain isSend={props.isSend}>
        <BaseChatMessageAvatar
          chatMessageInfo={props.chatMessageInfo}
        />
        <BaseChatMessageInfo
          isSend={props.isSend}
          chatMessageInfo={props.chatMessageInfo}
        />
      </MessageMain>
    </MessageWrapper>
  );
});

export default BaseChatMessage;