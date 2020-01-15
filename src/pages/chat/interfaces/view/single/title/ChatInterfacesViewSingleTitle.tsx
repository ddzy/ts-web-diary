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
import { IBasicChatSingleInfo } from 'pages/basic.types';


export interface IChatInterfacesViewSingleTitleProps {
  // ? 单聊信息
  singleChatInfo: IBasicChatSingleInfo,
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