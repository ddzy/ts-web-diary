import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Descriptions, Avatar } from "antd";

import { ContentWrapper, ContentMain } from "./style";
import { IBasicChatGroupInfo } from "pages/basic.types";

export interface IChatInterfacesViewGroupTitleInfoContentProps
  extends RouteComponentProps<{
    id: string;
  }> {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
}
export interface IChatInterfacesViewGroupTitleInfoContentState {}

const ChatInterfacesViewGroupTitleInfoContent = React.memo(
  (props: IChatInterfacesViewGroupTitleInfoContentProps) => {
    return (
      <ContentWrapper>
        <ContentMain>
          <Descriptions
            title={"群聊信息概览"}
            bordered={true}
            column={1}
            size={"default"}
          >
            <Descriptions.Item label={"群聊头像"}>
              <Avatar
                shape="square"
                size="large"
                icon="bulb"
                alt="群聊头像图片"
                src={props.groupInfo.avatar}
              />
            </Descriptions.Item>
            <Descriptions.Item label={"群聊名称"}>
              {props.groupInfo.name}
            </Descriptions.Item>
            <Descriptions.Item label={"群聊简介"}>
              {props.groupInfo.description}
            </Descriptions.Item>
            <Descriptions.Item label={"管理员总数"}>
              {props.groupInfo.admins.length}
            </Descriptions.Item>
            <Descriptions.Item label={"成员总数"}>
              {props.groupInfo.member_total}
            </Descriptions.Item>
            <Descriptions.Item label={"消息总数"}>
              {props.groupInfo.message_total}
            </Descriptions.Item>
          </Descriptions>
        </ContentMain>
      </ContentWrapper>
    );
  }
);

export default withRouter(ChatInterfacesViewGroupTitleInfoContent);
