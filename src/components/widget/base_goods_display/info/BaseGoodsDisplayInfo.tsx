import * as React from 'react';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import BaseGoodsDisplayInfoTitle from './title/BaseGoodsDisplayInfoTitle';
import BaseGoodsDisplayInfoContent from './content/BaseGoodsDisplayInfoContent';
import BaseGoodsDisplayInfoAction from './action/BaseGoodsDisplayInfoAction';


export interface IBaseGoodsDisplayInfoProps {
  title: React.ReactNode;
  content: React.ReactNode;
  action: React.ReactNode;
};
export interface IBaseGoodsDisplayInfoState { };


const BaseGoodsDisplayInfo = React.memo((props: IBaseGoodsDisplayInfoProps) => {
  return (
    <InfoWrapper>
      <InfoMain>
        {/* 标题区 */}
        <BaseGoodsDisplayInfoTitle
          title={props.title}
        />

        {/* 内容区 */}
        <BaseGoodsDisplayInfoContent
          content={props.content}
        />

        {/* 动作区 */}
        <BaseGoodsDisplayInfoAction
          action={props.action}
        />
      </InfoMain>
    </InfoWrapper>
  );
});


export default BaseGoodsDisplayInfo;