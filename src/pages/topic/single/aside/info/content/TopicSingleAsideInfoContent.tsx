import * as React from 'react';
import {
  Button,
  Avatar,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainAvatarBox,
  ContentMainNameBox,
  ContentMainName,
  ContentMainAttentionBox,
  ContentMainDescriptionBox,
  ContentMainDescription,
} from './style';


export interface ITopicSingleAsideInfoContentProps { };
export interface ITopicSingleAsideInfoContentState { };


const TopicSingleAsideInfoContent = React.memo((props: ITopicSingleAsideInfoContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        {/* 头像区 */}
        <ContentMainAvatarBox>
          <Avatar
            size={60}
            shape="square"
            src={''}
          />
        </ContentMainAvatarBox>

        {/* 名称区 */}
        <ContentMainNameBox>
          <ContentMainName>
            {'上班摸鱼'}
          </ContentMainName>
        </ContentMainNameBox>

        {/* 关注区 */}
        <ContentMainAttentionBox>
          <Button
            type="primary"
          >关注</Button>
        </ContentMainAttentionBox>

        {/* 介绍区 */}
        <ContentMainDescriptionBox>
          <ContentMainDescription>
            来分享下你上下班看到的好东西吧~
          </ContentMainDescription>
        </ContentMainDescriptionBox>
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleAsideInfoContent;