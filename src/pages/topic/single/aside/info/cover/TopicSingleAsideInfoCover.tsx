import * as React from 'react';

import {
  CoverWrapper,
  CoverMain,
  CoverMainImageBox,
  CoverMainImage,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';


export interface ITopicSingleAsideInfoCoverProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
export interface ITopicSingleAsideInfoCoverState { };


const TopicSingleAsideInfoCover = React.memo((props: ITopicSingleAsideInfoCoverProps) => {
  return (
    <CoverWrapper>
      <CoverMain>
        <CoverMainImageBox>
          <CoverMainImage coverImgUrl={props.topicInfo.cover_img} />
        </CoverMainImageBox>
      </CoverMain>
    </CoverWrapper>
  );
});


export default TopicSingleAsideInfoCover;