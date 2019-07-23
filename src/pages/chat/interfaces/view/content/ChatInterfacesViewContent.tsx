import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
} from './style';


export interface IChatInterfacesViewContentProps { };

const ChatInterfacesViewContent = React.memo((props: IChatInterfacesViewContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        前端技术交流群聊天内容
      </ContentMain>
    </ContentWrapper>
  );
});

export default ChatInterfacesViewContent;