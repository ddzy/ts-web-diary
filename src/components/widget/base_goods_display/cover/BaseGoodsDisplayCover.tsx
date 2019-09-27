import * as React from 'react';

import {
  CoverWrapper,
  CoverMain,
  CoverMainImg,
} from './style';


export interface IBaseGoodsDisplayCoverProps {
  // ? 封面图片
  coverImg: string;
};
export interface IBaseGoodsDisplayCoverState { };


const BaseGoodsDisplayCover = React.memo((props: IBaseGoodsDisplayCoverProps) =>
{
  return (
    <CoverWrapper>
      <CoverMain>
        <CoverMainImg src={props.coverImg} />
      </CoverMain>
    </CoverWrapper>
  );
});


export default BaseGoodsDisplayCover;