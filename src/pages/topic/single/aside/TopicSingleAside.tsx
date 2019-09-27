import * as React from 'react';

import {
  AsideWrapper,
  AsideMain,
} from './style';


export interface ITopicSingleAsideProps { };
export interface ITopicSingleAsideState { };


const TopicSingleAside = React.memo((props: ITopicSingleAsideProps) => {
  return (
    <AsideWrapper>
      <AsideMain>
        右侧内容框
      </AsideMain>
    </AsideWrapper>
  );
});


export default TopicSingleAside;