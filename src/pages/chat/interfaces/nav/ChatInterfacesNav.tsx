import * as React from 'react';

import {
  NavWrapper,
  NavMain,
} from './style';

import ChatInterfacesNavSearch from './search/ChatInterfacesNavSearch';
import ChatInterfacesNavMessage from './message/ChatInterfacesNavMessage';


export interface IChatInterfacesNavProps { };

const ChatInterfacesNav = React.memo((props: IChatInterfacesNavProps) => {
  return (
    <NavWrapper>
      <NavMain>
        <ChatInterfacesNavSearch />
        <ChatInterfacesNavMessage />
      </NavMain>
    </NavWrapper>
  );
});

export default ChatInterfacesNav;