import * as React from 'react';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import ChatInterfacesViewSingleActionExtra from './extra/ChatInterfacesViewSingleActionExtra';
import ChatInterfacesViewSingleActionInput from './input/ChatInterfacesViewSingleActionInput';


export interface IChatInterfacesViewSingleActionProps { };

const ChatInterfacesViewSingleAction = React.memo((props: IChatInterfacesViewSingleActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <ChatInterfacesViewSingleActionExtra />
        <ChatInterfacesViewSingleActionInput />
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewSingleAction;