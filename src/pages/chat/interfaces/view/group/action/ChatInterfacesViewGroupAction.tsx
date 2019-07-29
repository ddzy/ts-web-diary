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
        <ChatInterfacesViewGroupActionExtra />
        <ChatInterfacesViewGroupActionInput />
      </ActionMain>
    </ActionWrapper>
  );
});

export default ChatInterfacesViewGroupAction;