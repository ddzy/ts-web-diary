import * as React from 'react';

import {
  ItemWrapper,
  ItemMain,
} from './style';
import BasePinItemTitle from './title/BasePinItemTitle';
import BasePinItemContent from './content/BasePinItemContent';
import BasePinItemTopic from './topic/BasePinItemTopic';
import BasePinItemAction from './action/BasePinItemAction';


export interface IBasePinItemProps { };
export interface IBasePinItemState { }


const BasePinItem = React.memo((props: IBasePinItemProps) => {
  return (
    <ItemWrapper>
      <ItemMain>
        {/* 沸点标题区 */}
        <BasePinItemTitle />

        {/* 沸点内容区 */}
        <BasePinItemContent />

        {/* 沸点话题区 */}
        <BasePinItemTopic />

        {/* 沸点评论区 */}
        <BasePinItemAction />
      </ItemMain>
    </ItemWrapper>
  );
});

export default BasePinItem;