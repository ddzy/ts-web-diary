import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';


export interface ITopicAllPossessContentProps {
  // ? 我关注的话题列表
  allTopicList: IBaseCommonTopicInfo[];
};
export interface ITopicAllPossessContentState { };


const TopicAllPossessContent = React.memo((props: ITopicAllPossessContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        全部话题的内容
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicAllPossessContent;