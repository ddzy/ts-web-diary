import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleMainText,
} from './style';


export interface ITopicAllMainAttentionTitleProps { };
export interface ITopicAllMainAttentionTitleState { };


const TopicAllMainAttentionTitle = React.memo((props: ITopicAllMainAttentionTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleMainText>
          我关注的话题
        </TitleMainText>
      </TitleMain>
    </TitleWrapper>
  );
});


export default TopicAllMainAttentionTitle;