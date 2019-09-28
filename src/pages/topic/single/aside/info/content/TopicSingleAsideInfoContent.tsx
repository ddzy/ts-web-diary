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
import { IStaticTopicInfo } from 'pages/topic/Topic.types';


export interface ITopicSingleAsideInfoContentProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
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
            src={props.topicInfo.cover_img}
          />
        </ContentMainAvatarBox>

        {/* 名称区 */}
        <ContentMainNameBox>
          <ContentMainName>
            {props.topicInfo.name}
          </ContentMainName>
        </ContentMainNameBox>

        {/* 关注区 */}
        <ContentMainAttentionBox>
          <Button
            type="primary"
          >
            {
              props.topicInfo.is_attention ? '取消关注' : '关注'
            }
          </Button>
        </ContentMainAttentionBox>

        {/* 介绍区 */}
        <ContentMainDescriptionBox>
          <ContentMainDescription>
            {props.topicInfo.description}
          </ContentMainDescription>
        </ContentMainDescriptionBox>
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleAsideInfoContent;