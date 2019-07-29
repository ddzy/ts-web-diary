import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  SendWrapper,
  SendMain,
} from './style';


export interface IChatInterfacesViewSingleActionSendProps { };

const ChatInterfacesViewSingleActionSend = React.memo((props: IChatInterfacesViewSingleActionSendProps) => {
  return (
    <SendWrapper>
      <SendMain>
        <Button
          type="primary"
          block
        >发送</Button>
      </SendMain>
    </SendWrapper>
  );
});

export default ChatInterfacesViewSingleActionSend;