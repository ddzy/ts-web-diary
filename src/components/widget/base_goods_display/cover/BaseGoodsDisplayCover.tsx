import * as React from 'react';
import Lazyload from 'react-lazyload';


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
        <Lazyload>
          <CoverMainImg src={props.coverImg} />
        </Lazyload>
      </CoverMain>
    </CoverWrapper>
  );
});


export default BaseGoodsDisplayCover;