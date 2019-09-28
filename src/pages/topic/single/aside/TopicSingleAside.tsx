import * as React from 'react';

import {
  AsideWrapper,
  AsideMain,
} from './style';
import TopicSingleAsideInfo from './info/TopicSingleAsideInfo';
import TopicSingleAsideActor from './actor/TopicSingleAsideActor';


export interface ITopicSingleAsideProps { };
export interface ITopicSingleAsideState { };


const TopicSingleAside = React.memo((props: ITopicSingleAsideProps) => {
  return (
    <AsideWrapper>
      <AsideMain>
        {/* 话题信息区 */}
        <TopicSingleAsideInfo />

        {/* 话题参与者区 */}
        <TopicSingleAsideActor />
      </AsideMain>
    </AsideWrapper>
  );
});


export default TopicSingleAside;