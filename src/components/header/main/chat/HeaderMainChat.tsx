import * as React from 'react';
import {
  Button,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ChatContainer,
  ChatMain,
} from './style';


export interface IHeaderMainChatProps extends RouteComponentProps { };


const HeaderMainChat = React.memo<IHeaderMainChatProps>((
  props: IHeaderMainChatProps,
): JSX.Element => {
  function handleToChatBtnClick() {
    props.history.push('/chat');
  }

  return (
    <ChatContainer>
      <ChatMain>
        <Button
          type="primary"
          icon="cloud"
          onClick={handleToChatBtnClick}
        >
          聊天室
        </Button>
      </ChatMain>
    </ChatContainer>
  );
});


export default withRouter(HeaderMainChat);