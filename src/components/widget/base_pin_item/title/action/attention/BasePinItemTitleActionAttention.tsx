import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  AttentionWrapper,
  AttentionMain,
} from './style';


export interface IBasePinItemTitleActionAttentionProps { };
export interface IBasePinItemTitleActionAttentionState { }


const BasePinItemTitleActionAttention = React.memo((props: IBasePinItemTitleActionAttentionProps) => {
  return (
    <AttentionWrapper>
      <AttentionMain>
        <Button
          type="ghost"
          size="small"
          icon="eye"
        >关注他</Button>
      </AttentionMain>
    </AttentionWrapper>
  );
});

export default BasePinItemTitleActionAttention;