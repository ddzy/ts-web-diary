import * as React from 'react';
import {
  Row,
  Col,
  message,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import ChatInterfacesViewSingleActionExtra from './extra/ChatInterfacesViewSingleActionExtra';
import ChatInterfacesViewSingleActionInput from './input/ChatInterfacesViewSingleActionInput';
import ChatInterfacesViewSingleActionSend from './send/ChatInterfacesViewSingleActionSend';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';


export interface IChatInterfacesViewSingleActionProps {
  // ? 发送聊天消息
  onChatMessageSend: (
    messageInfo: IChatInterfacesViewSingleActionState['messageInfo'],
    callback?: () => void,
  ) => void;
};
export interface IChatInterfacesViewSingleActionState {
  // ? 聊天消息
  messageInfo: {
    // * 消息类型
    // * 目前只计划实现三种, plain(普通文本)、image(图片)、文件(file)
    type: IBaseCommonChatMessgaeType,
    content: string,
  };
};

const ChatInterfacesViewSingleAction = React.memo((props: IChatInterfacesViewSingleActionProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleActionState>({
    messageInfo: {
      type: 'plain',
      content: '',
    },
  });

  /**
   * 处理 - 输入框普通文本消息输入
   * @param e 输入事件流
   * @todo 目前只计划了三种消息类型: 普通文本(plain)、图片(image)、文件(file)
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
        content: value,
      },
    });
  }

  /**
   * 处理 - 发送聊天消息
   */
  function handleChatMessageSend(
    callback?: () => void,
  ) {
    const { content } = state.messageInfo;

    if (!content) {
      message.error('输入内容不能为空!');

      callback && callback();
    } else {
      props.onChatMessageSend(state.messageInfo, () => {
        // 清空输入框
        setState({
          ...state,
          messageInfo: {
            ...state.messageInfo,
            content: '',
          },
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
            {/* 聊天文件 */}
            <ChatInterfacesViewSingleActionExtra />
          </Col>
          <Col span={16}>
            {/* 聊天输入框 */}
            <ChatInterfacesViewSingleActionInput
              plainInputValue={state.messageInfo.content}
              onPlainInputChange={handlePlainInputChange}
            />
          </Col>
          <Col span={4}>
            {/* 聊天发送按钮 */}
            <ChatInterfacesViewSingleActionSend
              onChatMessageSend={handleChatMessageSend}
            />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewSingleAction;