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
  onChatMessageSend: (
    callback?: () => void,
  ) => void;
};
export interface IChatInterfacesViewSingleActionSendState {
  // ? 按钮loading状态
  loading: boolean;
};

const ChatInterfacesViewSingleActionSend = React.memo((props: IChatInterfacesViewSingleActionSendProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionSendState>({
    loading: false,
  });

  /**
   * [处理] - 提交按钮点击
   */
  function handleClick() {
    // 按钮loading
    setState({
      ...state,
      loading: true,
    });

    props.onChatMessageSend(() => {
      setTimeout(() => {
        setState({
          ...state,
          loading: false,
        });
      }, 0);
    });
  }

  return (
    <SendWrapper>
      <SendMain>
        <Button
          type="primary"
          block
          loading={state.loading}
          onClick={handleClick}
        >发送</Button>
      </SendMain>
    </SendWrapper>
  );
});

export default ChatInterfacesViewSingleActionSend;