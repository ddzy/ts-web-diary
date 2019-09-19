import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  SendWrapper,
  SendMain,
} from './style';


export interface IBasePinEditSendProps { };
export interface IBasePinEditSendState { }


const BasePinEditSend = React.memo((props: IBasePinEditSendProps) => {
  return (
    <SendWrapper>
      <SendMain>
        <Button
          type="primary"
          block={true}
        >发布</Button>
      </SendMain>
    </SendWrapper>
  );
});

export default BasePinEditSend;