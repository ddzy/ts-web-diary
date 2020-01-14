import * as React from "react";
import { Empty, List, Avatar, Skeleton } from "antd";

import { UserWrapper, UserMain } from "./style";
import { IBasicUserInfo } from "pages/basic.types";

export interface IUserMainContentAttentionViewUserProps {
  isOwner: boolean; // 是否主用户
  attentionList: IBasicUserInfo[]; // 关注的用户列表
}
export interface IUserMainContentAttentionViewUserState {}

const UserMainContentAttentionViewUser = React.memo(
  (props: IUserMainContentAttentionViewUserProps) => {
    /**
     * @description 初始化关注的用户列表
     * @author ddzy<1766083035@qq.com>
     * @since 2020/1/14
     */
    function _initAttentionList() {
      const attentionList = props.attentionList;

      return attentionList.length !== 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={attentionList}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="list-cancel-attention-user">{'取消关注'}</a>
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar size="large" src={item.useravatar} />
                  }
                  title={item.username}
                  description={item.introduction || item.website}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="暂时没有关注任何用户..." />
      );
    }

    return (
      <UserWrapper>
        <UserMain>{_initAttentionList()}</UserMain>
      </UserWrapper>
    );
  }
);

export default UserMainContentAttentionViewUser;
