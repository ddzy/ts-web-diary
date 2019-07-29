import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  InputWrapper,
  InputMain,
  InputMainContent,
} from './style';


export interface IChatInterfacesViewSingleActionInputProps { };

const ChatInterfacesViewSingleActionInput = React.memo((props: IChatInterfacesViewSingleActionInputProps) => {
  return (
    <InputWrapper>
      <InputMain>
        <InputMainContent>
          <Input
            placeholder={'说点什么吧...'}
          />
        </InputMainContent>
      </InputMain>
    </InputWrapper>
  );
});

export default ChatInterfacesViewSingleActionInput;