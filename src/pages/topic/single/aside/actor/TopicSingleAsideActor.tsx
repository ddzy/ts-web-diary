import * as React from 'react';
import {
  Spin,
} from 'antd';

import {
  ActorWrapper,
  ActorMain,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';
import TopicSingleAsideActorTitle from './title/TopicSingleAsideActorTitle';
import TopicSingleAsideActorContent from './content/TopicSingleAsideActorContent';


export interface ITopicSingleAsideActorProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
  // ? 获取首屏数据时的 loading 状态
  isShowFirstlyLoading: boolean;
};
export interface ITopicSingleAsideActorState { };


const TopicSingleAsideActor = React.memo((props: ITopicSingleAsideActorProps) => {
  return (
    <Spin spinning={props.isShowFirstlyLoading}>
      <ActorWrapper>
        <ActorMain>
          {/* 标题区 */}
          <TopicSingleAsideActorTitle
            topicInfo={props.topicInfo}
          />

          {/* 参与的用户列表展示区 */}
          <TopicSingleAsideActorContent
            topicInfo={props.topicInfo}
          />
        </ActorMain>
      </ActorWrapper>
    </Spin>
  );
});


export default TopicSingleAsideActor;