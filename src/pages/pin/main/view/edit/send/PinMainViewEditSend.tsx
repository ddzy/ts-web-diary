import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  SendWrapper,
  SendMain,
} from './style';


export interface IPinMainViewEditSendProps { };
export interface IPinMainViewEditSendState { }


const PinMainViewEditSend = React.memo((props: IPinMainViewEditSendProps) => {
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

export default PinMainViewEditSend;