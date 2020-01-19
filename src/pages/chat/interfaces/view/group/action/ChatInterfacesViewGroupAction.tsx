import * as React from 'react';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import ChatInterfacesViewGroupActionExtra from './extra/ChatInterfacesViewGroupActionExtra';
import ChatInterfacesViewGroupActionInput from './input/ChatInterfacesViewGroupActionInput';


export interface IChatInterfacesViewGroupActionProps { };

const ChatInterfacesViewGroupAction = React.memo((props: IChatInterfacesViewGroupActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        {/* 输入框左部表情区 */}
        <ChatInterfacesViewGroupActionExtra />

        {/* 输入框右部输入区 */}
        <ChatInterfacesViewGroupActionInput />
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewGroupAction;