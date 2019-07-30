import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  SendWrapper,
  SendMain,
} from './style';


export interface IChatInterfacesViewSingleActionSendProps {
  // ? 发送聊天消息
  onChatMessageSend: () => void;
};

const ChatInterfacesViewSingleActionSend = React.memo((props: IChatInterfacesViewSingleActionSendProps) => {
  return (
    <SendWrapper>
      <SendMain>
        <Button
          type="primary"
          block
          onClick={props.onChatMessageSend}
        >发送</Button>
      </SendMain>
    </SendWrapper>
  );
});

export default ChatInterfacesViewSingleActionSend;