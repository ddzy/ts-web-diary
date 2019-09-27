import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleMainText,
} from './style';


export interface ITopicAllMainPossessTitleProps { };
export interface ITopicAllMainPossessTitleState { };


const TopicAllMainPossessTitle = React.memo((props: ITopicAllMainPossessTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleMainText>全部话题</TitleMainText>
      </TitleMain>
    </TitleWrapper>
  );
});


export default TopicAllMainPossessTitle;