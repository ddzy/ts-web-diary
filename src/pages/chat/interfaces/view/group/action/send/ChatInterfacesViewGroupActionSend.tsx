import * as React from "react";
import { Button } from "antd";

import { SendWrapper, SendMain } from "./style";

export interface IChatInterfacesViewGroupActionSendProps {
  // ? 发送聊天消息
  onChatMessageSend: (callback?: () => void) => void;
}
export interface IChatInterfacesViewGroupActionSendState {
  // ? 按钮loading状态
  loading: boolean;
}

const ChatInterfacesViewGroupActionSend = React.memo(
  (props: IChatInterfacesViewGroupActionSendProps) => {
    const [state, setState] = React.useState<
      IChatInterfacesViewGroupActionSendState
    >({
      loading: false
    });

    /**
     * @description 发送消息按钮点击
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleClick() {
      setState({
        ...state,
        loading: true
      });

      props.onChatMessageSend(() => {
        setTimeout(() => {
          setState({
            ...state,
            loading: false
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
          >
            发送
          </Button>
        </SendMain>
      </SendWrapper>
    );
  }
);

export default ChatInterfacesViewGroupActionSend;
