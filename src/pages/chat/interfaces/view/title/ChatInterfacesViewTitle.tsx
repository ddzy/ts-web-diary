import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';


export interface IChatInterfacesViewTitleProps { };

const ChatInterfacesViewTitle = React.memo((props: IChatInterfacesViewTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>前端技术交流群</TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewTitle;