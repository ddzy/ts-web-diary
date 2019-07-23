import * as React from 'react';

import {
  ViewWrapper,
  ViewMain,
} from './style';
import ChatInterfacesViewTitle from './title/ChatInterfacesViewTitle';
import ChatInterfacesViewContent from './content/ChatInterfacesViewContent';
import ChatInterfacesViewAction from './action/ChatInterfacesViewAction';


export interface IChatInterfacesViewProps { };

const ChatInterfacesView = React.memo((props: IChatInterfacesViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        <ChatInterfacesViewTitle />
        <ChatInterfacesViewContent />
        <ChatInterfacesViewAction />
      </ViewMain>
    </ViewWrapper>
  );
});

export default ChatInterfacesView;