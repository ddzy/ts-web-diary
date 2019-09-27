import * as React from 'react';

import {
  AttentionWrapper,
  AttentionMain,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import TopicAllMainAttentionTitle from './title/TopicAllMainAttentionTitle';
import TopicAllMainAttentionContent from './content/TopicAllMainAttentionContent';


export interface ITopicAllMainAttentionProps {
  // ? 我关注的话题列表
  attentionTopicList: IBaseCommonTopicInfo[];
};
export interface ITopicAllMainAttentionState { };


const TopicAllMainAttention = React.memo((props: ITopicAllMainAttentionProps) => {
  return (
    <AttentionWrapper>
      <AttentionMain>
        {/* 标题区 */}
        <TopicAllMainAttentionTitle />

        {/* 标题列表区 */}
        <TopicAllMainAttentionContent
          attentionTopicList={props.attentionTopicList}
        />
      </AttentionMain>
    </AttentionWrapper>
  );
});


export default TopicAllMainAttention;