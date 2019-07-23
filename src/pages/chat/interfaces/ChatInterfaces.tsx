import * as React from 'react';

import {
  InterfacesWrapper,
  InterfacesMain,
} from './style';
import ChatInterfacesNav from './nav/ChatInterfacesNav';
import ChatInterfacesView from './view/ChatInterfacesView';


export interface IChatInterfacesProps {

};


function ChatInterfaces(props: IChatInterfacesProps) {
  return (
    <InterfacesWrapper>
      <InterfacesMain>
        <ChatInterfacesNav />
        <ChatInterfacesView />
      </InterfacesMain>
    </InterfacesWrapper>
  );
}

export default ChatInterfaces;