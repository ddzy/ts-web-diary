import * as React from 'react';
import {
  Spin,
} from 'antd';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';
import TopicSingleAsideInfoCover from './cover/TopicSingleAsideInfoCover';
import TopicSingleAsideInfoContent from './content/TopicSingleAsideInfoContent';
import TopicSingleAsideInfoStatistic from './statistic/TopicSingleAsideInfoStatistic';


export interface ITopicSingleAsideInfoProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
  // ? 获取首屏数据时的loading状态
  isShowFirstlyLoading: boolean;

  onToggleAttention: (
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) => void;
};
export interface ITopicSingleAsideInfoState { };


const TopicSingleAsideInfo = React.memo((props: ITopicSingleAsideInfoProps) => {
  return (
    <Spin spinning={props.isShowFirstlyLoading}>
      <InfoWrapper>
        <InfoMain>
          {/* 封面图展示区 */}
          <TopicSingleAsideInfoCover
            topicInfo={props.topicInfo}
          />

          {/* 话题信息区 */}
          <TopicSingleAsideInfoContent
            topicInfo={props.topicInfo}
            onToggleAttention={props.onToggleAttention}
          />

          {/* 话题数据统计区 */}
          <TopicSingleAsideInfoStatistic
            topicInfo={props.topicInfo}
          />
        </InfoMain>
      </InfoWrapper>
    </Spin>
  );
});


export default TopicSingleAsideInfo;