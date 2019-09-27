import * as React from 'react';

import {
  ActionWrapper,
  ActionMain,
} from './style';


export interface IBaseGoodsDisplayInfoActionProps {
  // ? 动作区内容
  action: React.ReactNode;
};
export interface IBaseGoodsDisplayInfoActionState { };


const BaseGoodsDisplayInfoAction = React.memo((props: IBaseGoodsDisplayInfoActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        {props.action}
      </ActionMain>
    </ActionWrapper>
  );
});


export default BaseGoodsDisplayInfoAction;