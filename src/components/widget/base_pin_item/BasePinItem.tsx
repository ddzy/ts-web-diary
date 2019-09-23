import * as React from 'react';

import {
  ItemWrapper,
  ItemMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from './BasePinItem.types';
import BasePinItemTitle from './title/BasePinItemTitle';
import BasePinItemContent from './content/BasePinItemContent';
import BasePinItemTopic from './topic/BasePinItemTopic';
import BasePinItemAction from './action/BasePinItemAction';


export interface IBasePinItemProps {
  // ? 沸点信息
  pinInfo: ICommonBasePinItemInfo;
};
export interface IBasePinItemState { };


const BasePinItem = React.memo((props: IBasePinItemProps) => {
  return (
    <ItemWrapper>
      <ItemMain>
        {/* 沸点标题区 */}
        <BasePinItemTitle
          pinInfo={props.pinInfo}
        />

        {/* 沸点内容区 */}
        <BasePinItemContent
          pinInfo={props.pinInfo}
        />

        {/* 沸点话题区 */}
        <BasePinItemTopic
          pinInfo={props.pinInfo}
        />

        {/* 沸点评论区 */}
        <BasePinItemAction
          pinInfo={props.pinInfo}
        />
      </ItemMain>
    </ItemWrapper>
  );
});

export default BasePinItem;