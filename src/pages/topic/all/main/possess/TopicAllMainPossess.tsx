import * as React from 'react';

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
};
export interface ITopicAllMainPossessState { };


const TopicAllMainPossess = React.memo((props: ITopicAllMainPossessProps) => {
  return (
    <PossessWrapper>
      <PossessMain>
        {/* 标题区 */}
        <TopicAllMainPossessTitle />

        {/* 内容区 */}
        <TopicAllMainPossessContent
          allTopicList={props.allTopicList}
        />
      </PossessMain>
    </PossessWrapper>
  );
});


export default TopicAllMainPossess;