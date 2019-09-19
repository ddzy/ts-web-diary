import * as React from 'react';

import {
  TopicWrapper,
  TopicMain,
} from './style';


export interface IBasePinItemTopicProps { };
export interface IBasePinItemTopicState { }


const BasePinItemTopic = React.memo((props: IBasePinItemTopicProps) => {
  return (
    <TopicWrapper>
      <TopicMain>
        话题区域
      </TopicMain>
    </TopicWrapper>
  );
});

export default BasePinItemTopic;