import * as React from "react";
import { Input } from "antd";

import { InputWrapper, InputMain, InputMainContent } from "./style";

export interface IChatInterfacesViewGroupActionInputProps {
  // ? 输入框value
  plainInputValue: string;
  // ? 输入框onChange
  onPlainInputChange: (e: React.ChangeEvent) => void;
}

const ChatInterfacesViewGroupActionInput = React.memo(
  (props: IChatInterfacesViewGroupActionInputProps) => {
    return (
      <InputWrapper>
        <InputMain>
          <InputMainContent>
            <Input
              placeholder={"畅所欲言..."}
              value={props.plainInputValue}
              onChange={props.onPlainInputChange}
            />
          </InputMainContent>
        </InputMain>
      </InputWrapper>
    );
  }
);

export default ChatInterfacesViewGroupActionInput;
