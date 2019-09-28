import * as React from 'react';
import {
  Avatar,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
  ContentMainItemAvatarBox,
  ContentMainItemNameBox,
  ContentMainItemName,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';


export interface ITopicSingleAsideActorContentProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
export interface ITopicSingleAsideActorContentState { };


const TopicSingleAsideActorContent = React.memo((props: ITopicSingleAsideActorContentProps) => {
  /**
   * [初始化] - 参与者用户列表
   */
  function _initUserList() {
    const actorList = props.topicInfo.actors;

    return actorList.map((v) => {
      return (
        <ContentMainItem key={v._id}>
          {/* 头像区 */}
          <ContentMainItemAvatarBox>
            <Avatar
              size="large"
              icon="user"
              src={v.useravatar}
            />
          </ContentMainItemAvatarBox>

          {/* 用户名区 */}
          <ContentMainItemNameBox>
            <ContentMainItemName>
              {v.username}
            </ContentMainItemName>
          </ContentMainItemNameBox>
        </ContentMainItem>
      );
    });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initUserList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleAsideActorContent;