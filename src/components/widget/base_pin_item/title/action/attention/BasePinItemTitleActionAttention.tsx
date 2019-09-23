import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  AttentionWrapper,
  AttentionMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemTitleActionAttentionProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'user_is_attention' | 'user_is_current_author' | 'user_is_friend'>;
};
export interface IBasePinItemTitleActionAttentionState { }


const BasePinItemTitleActionAttention = React.memo((props: IBasePinItemTitleActionAttentionProps) => {
  return (
    <AttentionWrapper>
      <AttentionMain>
        <Button
          type="ghost"
          size="small"
          icon={
            props.pinInfo.user_is_attention ? 'eye-invisible' : 'eye'
          }
          disabled={
            props.pinInfo.user_is_current_author
              ? true
              : false
          }
        >
          {
            props.pinInfo.user_is_attention ? '取消关注' : '关注他'
          }
        </Button>
      </AttentionMain>
    </AttentionWrapper>
  );
});

export default BasePinItemTitleActionAttention;