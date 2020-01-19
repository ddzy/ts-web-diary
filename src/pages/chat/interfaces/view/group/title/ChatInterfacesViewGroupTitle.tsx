import * as React from "react";
import { Row, Col } from "antd";

import { TitleWrapper, TitleMain } from "./style";
import ChatInterfacesViewGroupTitleName from "./name/ChatInterfacesViewGroupTitleName";
import ChatInterfacesViewGroupTitleInfo from "./info/ChatInterfacesViewGroupTitleInfo";
import { IBasicChatGroupInfo } from "pages/basic.types";

export interface IChatInterfacesViewGroupTitleProps {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
}

const ChatInterfacesViewGroupTitle = React.memo(
  (props: IChatInterfacesViewGroupTitleProps) => {
    return (
      <TitleWrapper>
        <TitleMain>
          <Row>
            <Col span={12}>
              {/* 左半区域群聊名称区 */}
              <ChatInterfacesViewGroupTitleName
                groupInfo={props.groupInfo}
              />
            </Col>
            <Col span={12}>
              {/* 右半部分群聊信息区 */}
              <ChatInterfacesViewGroupTitleInfo
                groupInfo={props.groupInfo}
              />
            </Col>
          </Row>
        </TitleMain>
      </TitleWrapper>
    );
  }
);

export default ChatInterfacesViewGroupTitle;
