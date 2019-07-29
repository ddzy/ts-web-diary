import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  SingleWrapper,
  SingleMain,
} from './style';
import ChatInterfacesViewSingleTitle from './title/ChatInterfacesViewSingleTitle';
import ChatInterfacesViewSingleContent from './content/ChatInterfacesViewSingleContent';
import ChatInterfacesViewSingleAction from './action/ChatInterfacesViewSingleAction';


export interface IChatInterfacesViewSingleProps extends RouteComponentProps { };

const ChatInterfacesViewSingle = React.memo((props: IChatInterfacesViewSingleProps) => {
  return (
    <SingleWrapper>
      <SingleMain>
        {/* 顶部标题栏 */}
        <ChatInterfacesViewSingleTitle />

        {/* 中部消息栏 */}
        <ChatInterfacesViewSingleContent />

        {/* 底部操作栏 */}
        <ChatInterfacesViewSingleAction />
      </SingleMain>
    </SingleWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingle);