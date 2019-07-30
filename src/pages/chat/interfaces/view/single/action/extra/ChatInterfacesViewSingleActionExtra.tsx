import * as React from 'react';
import {
  Icon,
  Row,
  Col,
} from 'antd';

import {
  ExtraWrapper,
  ExtraMain,
  ExtraMainEmoji,
  ExtraMainApplication,
} from './style';


export interface IChatInterfacesViewSingleActionExtraProps { };

const ChatInterfacesViewSingleActionExtra = React.memo((props: IChatInterfacesViewSingleActionExtraProps) => {
  return (
    <ExtraWrapper>
      <ExtraMain>
        <Row>
          <Col span={12}>
            <ExtraMainEmoji>
              <Icon
                type="smile"
                theme="filled"
                style={{
                  color: '#1da57a',
                  fontSize: '28px',
                  cursor: 'pointer',
                }}
              />
            </ExtraMainEmoji>
          </Col>
          <Col span={12}>
            <ExtraMainApplication>
              <Icon
                type="appstore"
                theme="filled"
                style={{
                  color: '#1da57a',
                  fontSize: '28px',
                  cursor: 'pointer',
                }}
              />
            </ExtraMainApplication>
          </Col>
        </Row>
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtra;