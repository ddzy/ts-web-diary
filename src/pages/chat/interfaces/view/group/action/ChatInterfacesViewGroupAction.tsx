import * as React from "react";
import { Row, Col, message } from "antd";

import { ActionWrapper, ActionMain } from "./style";
import ChatInterfacesViewGroupActionExtra from "./extra/ChatInterfacesViewGroupActionExtra";
import ChatInterfacesViewGroupActionInput from "./input/ChatInterfacesViewGroupActionInput";
import ChatInterfacesViewGroupActionSend from "./send/ChatInterfacesViewGroupActionSend";
import { IBasicChatMessgaeType } from "pages/basic.types";

export interface IChatInterfacesViewGroupActionProps {
  // ? 发送聊天消息
  onChatMessageSend: (
    messageInfo: IChatInterfacesViewGroupActionState["messageInfo"],
    callback?: () => void
  ) => void;
}
export interface IChatInterfacesViewGroupActionState {
  // ? 聊天消息
  messageInfo: {
    // * 消息类型
    type: IBasicChatMessgaeType;
    content: string;
  };
}

const ChatInterfacesViewGroupAction = React.memo(
  (props: IChatInterfacesViewGroupActionProps) => {
    const [state, setState] = React.useState<
      IChatInterfacesViewGroupActionState
    >({
      messageInfo: {
        type: 'plain',
        content: ""
      }
    });

    /**
     * @description 普通文本输入框输入
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handlePlainInputChange(e: React.ChangeEvent) {
      e.persist();

      const target = e.target as HTMLInputElement;
      const value = target.value;

      setState({
        ...state,
        messageInfo: {
          ...state.messageInfo,
          type: 'plain',
          content: value
        }
      });
    }

    /**
     * @description 发送普通文本形式的聊天消息
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handlePlainChatMessageSend(callback: () => void) {
      const { content } = state.messageInfo;

      if (!content) {
        message.error("输入内容不能为空!");

        callback && callback();
      } else {
        props.onChatMessageSend(state.messageInfo, () => {
          // 清空输入框
          setState({
            ...state,
            messageInfo: {
              ...state.messageInfo,
              content: ""
            }
          });

          callback && callback();
        });
      }
    }

    return (
      <ActionWrapper>
        <ActionMain>
          <Row>
            <Col span={4}>
              {/* 输入框左部表情区 */}
              <ChatInterfacesViewGroupActionExtra />
            </Col>
            <Col span={16}>
              {/* 输入框中部输入区 */}
              <ChatInterfacesViewGroupActionInput
                plainInputValue={state.messageInfo.content}
                onPlainInputChange={handlePlainInputChange}
              />
            </Col>
            <Col span={4}>
              {/* 输入框右部发送按钮区 */}
              <ChatInterfacesViewGroupActionSend
                onChatMessageSend={handlePlainChatMessageSend}
              />
            </Col>
          </Row>
        </ActionMain>
      </ActionWrapper>
    );
  }
);

export default ChatInterfacesViewGroupAction;
