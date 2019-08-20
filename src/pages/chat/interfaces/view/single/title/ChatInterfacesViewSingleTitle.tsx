import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';
import ChatInterfacesViewSingleTitleName from './name/ChatInterfacesViewSingleTitleName';
import ChatInterfacesViewSingleTitleInfo from './info/ChatInterfacesViewSingleTitleInfo';


export interface IChatInterfacesViewSingleTitleProps {
  // ? 单聊信息
  singleChatInfo: {
    from_member_id: {
      _id: string,
      chat_id: string,
      user_id: {
        _id: string,
        username: string,
      },
    },
    to_member_id: {
      _id: string,
      chat_id: string,
      user_id: {
        _id: string,
        username: string,
      },
    },
  },
};

const ChatInterfacesViewSingleTitle = React.memo((props: IChatInterfacesViewSingleTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>
          <Row>
            <Col span={12}>
              {/* 单聊名称 */}
              <ChatInterfacesViewSingleTitleName
                singleChatInfo={props.singleChatInfo}
              />
            </Col>
            <Col span={12}>
              {/* 单聊信息 */}
              <ChatInterfacesViewSingleTitleInfo />
            </Col>
          </Row>
        </TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewSingleTitle;