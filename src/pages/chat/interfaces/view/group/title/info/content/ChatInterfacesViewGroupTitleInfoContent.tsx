import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Descriptions, Avatar, Row, Col, Icon, Modal, message } from "antd";

import {
  ContentWrapper,
  ContentMain,
  MainTitleText,
  MainGroupMemberItem,
  MainGroupMemberList,
  MainGroupMemberWrapper
} from "./style";
import { IBasicChatGroupInfo } from "pages/basic.types";
import ChatInterfacesViewGroupTitleInfoContentInvite from "./invite/ChatInterfacesViewGroupTitleInfoContentInvite";
import {
  notificationUserChatGroupInviteIOClient,
  chatGroupIOClient
} from "services/websocket";
import { NOTIFICATION_TYPE } from "constants/constants";

export interface IChatInterfacesViewGroupTitleInfoContentProps
  extends RouteComponentProps<{
    id: string;
  }> {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
}
export interface IChatInterfacesViewGroupTitleInfoContentState {
  isShowInviteModal: boolean; // 是否显示邀请好友加入群聊的弹窗
  selectedFriendId: string; // 将要邀请的用户
}

const ChatInterfacesViewGroupTitleInfoContent = React.memo(
  (props: IChatInterfacesViewGroupTitleInfoContentProps) => {
    const [state, setState] = React.useState<
      IChatInterfacesViewGroupTitleInfoContentState
    >({
      isShowInviteModal: false,
      selectedFriendId: ""
    });

    /**
     * @description 初始化群聊成员列表
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function initChatGroupMemberList() {
      const memberList = props.groupInfo.members;

      const newMemberList = memberList.map(v => {
        return (
          <MainGroupMemberItem key={v._id} title={v.user_id.username}>
            <Avatar
              icon="user"
              size="large"
              src={v.user_id.useravatar}
              alt={v.user_id.username}
            />
          </MainGroupMemberItem>
        );
      });

      // 添加邀请好友进群按钮
      newMemberList.push(
        <MainGroupMemberItem key={"invite"} onClick={handleInviteBtnClick}>
          <Icon
            type="plus"
            style={{
              width: "40px",
              height: "40px"
            }}
          />
        </MainGroupMemberItem>
      );

      return newMemberList;
    }

    /**
     * @description 显示邀请好友进群的弹窗
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleShowInviteModal() {
      setState({
        ...state,
        isShowInviteModal: true
      });
    }

    /**
     * @description 隐藏邀请好友进群的弹窗
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleHideInviteModal() {
      setState({
        ...state,
        isShowInviteModal: false
      });
    }

    /**
     * @description 邀请好友模态框的下拉框选择
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleInviteSelectChange(data: string) {
      setState({
        ...state,
        selectedFriendId: data
      });
    }

    /**
     * @description 邀请按钮点击
     * @summary 邀请我的好友进入群聊
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleInviteBtnClick() {
      handleShowInviteModal();
    }

    /**
     * @description 邀请好友
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/20
     */
    function handleInviteFriend() {
      const userId = localStorage.getItem("userid");
      const friendId = state.selectedFriendId;

      if (!userId) {
        return message.error("用户凭证已丢失!");
      }

      if (!friendId) {
        return message.error("至少邀请一个朋友!");
      }

      // 检查选中的用户是否已经在本群
      const memberList = props.groupInfo.members;
      const isAlreadyInGroup = memberList.findIndex(v => {
        return v.user_id._id === friendId;
      });

      if (isAlreadyInGroup !== -1) {
        return message.info("该好友已在群聊中!");
      }

      const composedData = {
        from: userId,
        to: friendId,
        group: props.groupInfo._id,
        type: NOTIFICATION_TYPE.user.chat.group.invite
      };

      // 向该好友发送入群通知
      notificationUserChatGroupInviteIOClient.emit(
        "sendUserChatGroupInvite",
        composedData
      );

      // 将好友加入群聊
      chatGroupIOClient.emit("sendChatGroupInvite", composedData);

      message.success("邀请成功!");

      handleHideInviteModal();

      return;
    }

    return (
      <ContentWrapper>
        <ContentMain>
          <Row>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
              <MainTitleText>群聊成员</MainTitleText>
              <MainGroupMemberWrapper>
                <MainGroupMemberList>
                  {initChatGroupMemberList()}
                </MainGroupMemberList>
              </MainGroupMemberWrapper>
            </Col>
          </Row>
        </ContentMain>

        {/* 邀请好友进群的弹窗 */}
        <Modal
          maskClosable={false}
          centered={true}
          destroyOnClose={true}
          title="邀请好友"
          visible={state.isShowInviteModal}
          onOk={handleInviteFriend}
          onCancel={handleHideInviteModal}
        >
          <ChatInterfacesViewGroupTitleInfoContentInvite
            onInviteSelectChange={handleInviteSelectChange}
          />
        </Modal>
      </ContentWrapper>
    );
  }
);

export default withRouter(ChatInterfacesViewGroupTitleInfoContent);
