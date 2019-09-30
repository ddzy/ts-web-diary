import * as React from 'react';

import {
  CoverWrapper,
  CoverMain,
} from './style';


export interface IBaseGoodsDisplayCoverProps {
  // ? 封面部分
  cover: React.ReactNode;
};
export interface IBaseGoodsDisplayCoverState { };


const BaseGoodsDisplayCover = React.memo((props: IBaseGoodsDisplayCoverProps) =>
{
  return (
    <CoverWrapper>
      <CoverMain>
        {props.cover}
      </CoverMain>
    </CoverWrapper>
  );
});


export default BaseGoodsDisplayCover;