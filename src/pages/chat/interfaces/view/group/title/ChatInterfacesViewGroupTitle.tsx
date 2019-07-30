import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';


export interface IChatInterfacesViewGroupTitleProps { };

const ChatInterfacesViewGroupTitle = React.memo((props: IChatInterfacesViewGroupTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>前端技术交流群</TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewGroupTitle;