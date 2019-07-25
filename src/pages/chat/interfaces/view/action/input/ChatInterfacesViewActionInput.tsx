import * as React from 'react';
import {
  Input,
  Button,
} from 'antd';

import {
  InputWrapper,
  InputMain,
  InputMainContent,
  InputMainSend,
} from './style';


export interface IChatInterfacesViewActionInputProps { };

const ChatInterfacesViewActionInput = React.memo((props: IChatInterfacesViewActionInputProps) => {
  return (
    <InputWrapper>
      <InputMain>
        <InputMainContent>
          <Input
            placeholder={'说点什么吧...'}
          />
        </InputMainContent>
        <InputMainSend>
          <Button
            type="primary"
            block
          >发送</Button>
        </InputMainSend>
      </InputMain>
    </InputWrapper>
  );
});

export default ChatInterfacesViewActionInput;