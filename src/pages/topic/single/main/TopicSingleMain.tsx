import * as React from 'react';

import {
  MainWrapper,
  MainMain,
} from './style';
import TopicSingleMainEdit from './edit/TopicSingleMainEdit';
import TopicSingleMainContent from './content/TopicSingleMainContent';


export interface ITopicSingleMainProps { };
export interface ITopicSingleMainState { };


const TopicSingleMain = React.memo((props: ITopicSingleMainProps) => {
  return (
    <MainWrapper>
      <MainMain>
        {/* 头部沸点编辑区 */}
        <TopicSingleMainEdit />

        {/* 沸点内容区 */}
        <TopicSingleMainContent />
      </MainMain>
    </MainWrapper>
  );
});


export default TopicSingleMain;