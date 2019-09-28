import * as React from 'react';

import {
  ActorWrapper,
  ActorMain,
} from './style';
import TopicSingleAsideActorTitle from './title/TopicSingleAsideActorTitle';
import TopicSingleAsideActorContent from './content/TopicSingleAsideActorContent';


export interface ITopicSingleAsideActorProps { };
export interface ITopicSingleAsideActorState { };


const TopicSingleAsideActor = React.memo((props: ITopicSingleAsideActorProps) => {
  return (
    <ActorWrapper>
      <ActorMain>
        {/* 标题区 */}
        <TopicSingleAsideActorTitle />

        {/* 参与的用户列表展示区 */}
        <TopicSingleAsideActorContent />
      </ActorMain>
    </ActorWrapper>
  );
});


export default TopicSingleAsideActor;