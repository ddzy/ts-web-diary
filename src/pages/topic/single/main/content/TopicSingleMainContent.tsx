import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface ITopicSingleMainContentProps { };
export interface ITopicSingleMainContentState { };


const TopicSingleMainContent = React.memo((props: ITopicSingleMainContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        沸点列表
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleMainContent;