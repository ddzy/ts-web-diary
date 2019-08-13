import * as React from 'react';
import {
  Input,
} from 'antd';

import {
  InputWrapper,
  InputMain,
  InputMainContent,
} from './style';


export interface IChatInterfacesViewSingleActionInputProps {
  // ? 输入框value
  plainInputValue: string;
  // ? 输入框onChange
  onPlainInputChange: (e: React.ChangeEvent) => void;
};

const ChatInterfacesViewSingleActionInput = React.memo((props: IChatInterfacesViewSingleActionInputProps) => {
  return (
    <InputWrapper>
      <InputMain>
        <InputMainContent>
          <Input
            placeholder={'说点什么吧...'}
            value={props.plainInputValue}
            onChange={props.onPlainInputChange}
          />
        </InputMainContent>
      </InputMain>
    </InputWrapper>
  );
});

export default ChatInterfacesViewSingleActionInput;