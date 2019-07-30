import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';


export interface IChatInterfacesViewSingleTitleProps {
  // ? 接收方个人信息
  toMemberInfo: {
    _id: string,
    chat_id: string,
    user_id: {
      _id: string,
      username: string,
    },
  };
};

const ChatInterfacesViewSingleTitle = React.memo((props: IChatInterfacesViewSingleTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>
          {props.toMemberInfo.user_id.username}
        </TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewSingleTitle;