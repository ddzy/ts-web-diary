import * as React from "react";
import { Empty, List, Avatar, Skeleton } from "antd";

import { TopicWrapper, TopicMain } from "./style";
import { IBasicTopicInfo } from "pages/basic.types";

export interface IUserMainContentAttentionViewTopicrops {
  isOwner: boolean; // 是否主用户
  attentionList: IBasicTopicInfo[]; // 关注的话题列表
}
export interface IUserMainContentAttentionViewTopicState {}


const UserMainContentAttentionViewTopic = React.memo(
  (props: IUserMainContentAttentionViewTopicrops) => {
    /**
     * @description 初始化关注的话题列表
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
                <a key="list-cancel-attention-topic">{'取消关注'}</a>
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar size="large" src={item.cover_img} />
                  }
                  title={item.name}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="暂时没有关注任何话题..." />
      );
    }

    return (
      <TopicWrapper>
        <TopicMain>{_initAttentionList()}</TopicMain>
      </TopicWrapper>
    );
  }
);

export default UserMainContentAttentionViewTopic;
