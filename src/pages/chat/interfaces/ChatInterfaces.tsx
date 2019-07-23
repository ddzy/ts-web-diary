import * as React from 'react';

import {
  InterfacesWrapper,
  InterfacesMain,
} from './style';


export interface IChatInterfacesProps {

};


function ChatInterfaces(props: IChatInterfacesProps) {
  return (
    <InterfacesWrapper>
      <InterfacesMain>
        聊天主视图
      </InterfacesMain>
    </InterfacesWrapper>
  );
}

export default ChatInterfaces;