import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  ChatContainer,
  ChatMain,
} from './style';


export interface IHeaderMainChatProps { };


const HeaderMainChat = React.memo<IHeaderMainChatProps>((
  props: IHeaderMainChatProps,
): JSX.Element => {
  return (
    <ChatContainer>
      <ChatMain>
        <Button
          type="primary"
          icon="cloud"
        >
          聊天室
        </Button>
      </ChatMain>
    </ChatContainer>
  );
});


export default HeaderMainChat;