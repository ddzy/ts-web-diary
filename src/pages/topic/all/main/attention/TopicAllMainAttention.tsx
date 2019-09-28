import * as React from 'react';
import {
  Spin,
} from 'antd';

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
  // ? 是否显示获取首屏数据时的loading
  isShowFirstlyLoading: boolean;
};
export interface ITopicAllMainAttentionState { };


const TopicAllMainAttention = React.memo((props: ITopicAllMainAttentionProps) => {
  return (
    <AttentionWrapper>
      <AttentionMain>
        {/* 标题区 */}
        <TopicAllMainAttentionTitle />

        {/* 标题列表区 */}
        <Spin spinning={props.isShowFirstlyLoading}>
          <TopicAllMainAttentionContent
            attentionTopicList={props.attentionTopicList}
          />
        </Spin>
      </AttentionMain>
    </AttentionWrapper>
  );
});


export default TopicAllMainAttention;