import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import ChatInterfacesViewSingleActionExtra from './extra/ChatInterfacesViewSingleActionExtra';
import ChatInterfacesViewSingleActionInput from './input/ChatInterfacesViewSingleActionInput';
import ChatInterfacesViewSingleActionSend from './send/ChatInterfacesViewSingleActionSend';


export interface IChatInterfacesViewSingleActionProps { };

const ChatInterfacesViewSingleAction = React.memo((props: IChatInterfacesViewSingleActionProps) => {
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
            <ChatInterfacesViewSingleActionInput />
          </Col>
          <Col span={3}>
            {/* 聊天发送按钮 */}
            <ChatInterfacesViewSingleActionSend />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewSingleAction;