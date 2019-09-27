import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface IBaseGoodsDisplayInfoContentProps {
  // ? 内容
  content: React.ReactNode;
};
export interface IBaseGoodsDisplayInfoContentState { };


const BaseGoodsDisplayInfoContent = React.memo((props: IBaseGoodsDisplayInfoContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        {props.content}
      </ContentMain>
    </ContentWrapper>
  );
});


export default BaseGoodsDisplayInfoContent;