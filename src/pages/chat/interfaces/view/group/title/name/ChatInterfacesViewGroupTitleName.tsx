import * as React from 'react';

import {
  NameWrapper,
  NameMain,
  NameMainText,
} from './style';
import { IBasicChatGroupInfo } from 'pages/basic.types';


export interface IChatInterfacesViewGroupTitleNameProps {
  groupInfo: IBasicChatGroupInfo; // 群聊信息
};
export interface IChatInterfacesViewGroupTitleNameState { };


const ChatInterfacesViewGroupTitleName = React.memo((props: IChatInterfacesViewGroupTitleNameProps) => {
  return (
    <NameWrapper>
      <NameMain>
        <NameMainText>
          { props.groupInfo.name }
        </NameMainText>
      </NameMain>
    </NameWrapper>
  );
});


export default ChatInterfacesViewGroupTitleName;