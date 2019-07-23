import * as React from 'react';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import ChatInterfacesViewActionExtra from './extra/ChatInterfacesViewActionExtra';
import ChatInterfacesViewActionInput from './input/ChatInterfacesViewActionInput';


export interface IChatInterfacesViewActionProps { };

const ChatInterfacesViewAction = React.memo((props: IChatInterfacesViewActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <ChatInterfacesViewActionExtra />
        <ChatInterfacesViewActionInput />
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewAction;