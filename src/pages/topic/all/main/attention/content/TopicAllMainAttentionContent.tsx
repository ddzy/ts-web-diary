import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';


export interface ITopicAllMainAttentionContentProps {
  // ? 我关注的话题列表
  attentionTopicList: IBaseCommonTopicInfo[];
};
export interface ITopicAllMainAttentionContentState { };


const TopicAllMainAttentionContent = React.memo((props: ITopicAllMainAttentionContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        我关注的话题列表
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicAllMainAttentionContent;