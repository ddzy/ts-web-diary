import * as React from "react";
import { NavLink } from "react-router-dom";

import { InviteWrapper, InviteMain, MainTitle, MainTitleText } from "./style";
import { IBasicNotificationUserChatGroupInviteInfo } from "pages/basic.types";

export interface IHeaderMainDummyNotificationNoticeFriendInviteProps {
  // ? 邀请加入群聊的通知信息
  notificationInfo: IBasicNotificationUserChatGroupInviteInfo;
}
export interface IHeaderMainDummyNotificationNoticeFriendInviteState {}

const IHeaderMainDummyNotificationNoticeFriendInviteProps = React.memo(
  (props: IHeaderMainDummyNotificationNoticeFriendInviteProps) => {
    return (
      <InviteWrapper>
        <InviteMain>
          {/* 文本消息区 */}
          <MainTitle>
            <MainTitleText>
              你的好友
              <NavLink to={`/user/${props.notificationInfo.from._id}`}>
                {" "}
                {props.notificationInfo.from.username}
              </NavLink>{" "}
              邀请你加入了群聊
              <NavLink to={``}>
                {" "}
                {props.notificationInfo.group.name}
              </NavLink>
            </MainTitleText>
          </MainTitle>
        </InviteMain>
      </InviteWrapper>
    );
  }
);

export default IHeaderMainDummyNotificationNoticeFriendInviteProps;
