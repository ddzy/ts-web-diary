import * as React from 'react';

import {
  CoverWrapper,
  CoverMain,
  CoverMainImageBox,
  CoverMainImage,
} from './style';


export interface ITopicSingleAsideInfoCoverProps { };
export interface ITopicSingleAsideInfoCoverState { };


const TopicSingleAsideInfoCover = React.memo((props: ITopicSingleAsideInfoCoverProps) => {
  return (
    <CoverWrapper>
      <CoverMain>
        <CoverMainImageBox>
          <CoverMainImage coverImgUrl={''} />
        </CoverMainImageBox>
      </CoverMain>
    </CoverWrapper>
  );
});


export default TopicSingleAsideInfoCover;