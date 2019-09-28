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


export interface ITopicSingleAsideActorContentProps { };
export interface ITopicSingleAsideActorContentState { };


const TopicSingleAsideActorContent = React.memo((props: ITopicSingleAsideActorContentProps) => {
  /**
   * [初始化] - 参与者用户列表
   */
  function _initUserList() {
    return (
      <ContentMainItem>
        {/* 头像区 */}
        <ContentMainItemAvatarBox>
          <Avatar
            size="large"
            icon="user"
            src={''}
          />
        </ContentMainItemAvatarBox>

        {/* 用户名区 */}
        <ContentMainItemNameBox>
          <ContentMainItemName>
            bb老猫
          </ContentMainItemName>
        </ContentMainItemNameBox>
      </ContentMainItem>
    );
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