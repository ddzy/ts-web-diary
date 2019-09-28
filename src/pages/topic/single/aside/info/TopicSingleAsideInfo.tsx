import * as React from 'react';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import TopicSingleAsideInfoCover from './cover/TopicSingleAsideInfoCover';
import TopicSingleAsideInfoContent from './content/TopicSingleAsideInfoContent';
import TopicSingleAsideInfoStatistic from './statistic/TopicSingleAsideInfoStatistic';


export interface ITopicSingleAsideInfoProps { };
export interface ITopicSingleAsideInfoState { };


const TopicSingleAsideInfo = React.memo((props: ITopicSingleAsideInfoProps) => {
  return (
    <InfoWrapper>
      <InfoMain>
        {/* 封面图展示区 */}
        <TopicSingleAsideInfoCover />

        {/* 话题信息区 */}
        <TopicSingleAsideInfoContent />

        {/* 话题数据统计区 */}
        <TopicSingleAsideInfoStatistic />
      </InfoMain>
    </InfoWrapper>
  );
});


export default TopicSingleAsideInfo;