import * as React from 'react';
import {
  Spin,
} from 'antd';

import {
  PossessWrapper,
  PossessMain,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import TopicAllMainPossessTitle from './title/TopicAllMainPossessTitle';
import TopicAllMainPossessContent from './content/TopicAllMainPossessContent';


export interface ITopicAllMainPossessProps {
  // ? 我关注的话题列表
  allTopicList: IBaseCommonTopicInfo[];
  // ? 是否显示获取首屏数据时的loading
  isShowFirstlyLoading: boolean;

  onToggleAttention: (
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) => void;
};
export interface ITopicAllMainPossessState { };


const TopicAllMainPossess = React.memo((props: ITopicAllMainPossessProps) => {
  return (
    <PossessWrapper>
      <PossessMain>
        {/* 标题区 */}
        <TopicAllMainPossessTitle />

        {/* 内容区 */}
        <Spin spinning={props.isShowFirstlyLoading}>
          <TopicAllMainPossessContent
            allTopicList={props.allTopicList}
            onToggleAttention={props.onToggleAttention}
          />
        </Spin>
      </PossessMain>
    </PossessWrapper>
  );
});


export default TopicAllMainPossess;