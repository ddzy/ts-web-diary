import * as React from 'react';

import {
  ActionWrapper,
  ActionMain,
} from './style';


export interface IBasePinItemActionProps { };
export interface IBasePinItemActionState { }


const BasePinItemAction = React.memo((props: IBasePinItemActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        评论区 & 点赞区
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemAction;