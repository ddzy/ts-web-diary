import * as React from 'react';
import {
  withRouter,
} from 'react-router-dom';

import {
  GroupWrapper,
  GroupMain,
} from './style';
import ChatInterfacesViewGroupTitle from './title/ChatInterfacesViewGroupTitle';
import ChatInterfacesViewGroupContent from './content/ChatInterfacesViewGroupContent';
import ChatInterfacesViewGroupAction from './action/ChatInterfacesViewGroupAction';


export interface IChatInterfacesViewGroupProps { };

const ChatInterfacesViewGroup = React.memo((props: IChatInterfacesViewGroupProps) => {
  return (
    <GroupWrapper>
      <GroupMain>
        {/* 群聊顶部标题区块 */}
        <ChatInterfacesViewGroupTitle />

        {/* 群聊中部内容区块 */}
        <ChatInterfacesViewGroupContent />

        {/* 群聊尾部操作区块 */}
        <ChatInterfacesViewGroupAction />
      </GroupMain>
    </GroupWrapper>
  );
});

export default withRouter(ChatInterfacesViewGroup);