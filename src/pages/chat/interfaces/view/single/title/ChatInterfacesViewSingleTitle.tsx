import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';


export interface IChatInterfacesViewSingleTitleProps { };

const ChatInterfacesViewSingleTitle = React.memo((props: IChatInterfacesViewSingleTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>小红</TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewSingleTitle;