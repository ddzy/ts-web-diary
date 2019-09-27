import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
} from './style';


export interface IBaseGoodsDisplayInfoTitleProps {
  // ? 标题区的内容
  title: React.ReactNode;
};
export interface IBaseGoodsDisplayInfoTitleState { };


const BaseGoodsDisplayInfoTitle = React.memo((props: IBaseGoodsDisplayInfoTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        {props.title}
      </TitleMain>
    </TitleWrapper>
  );
});


export default BaseGoodsDisplayInfoTitle;