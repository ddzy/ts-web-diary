import * as React from 'react';

import {
  InfoWrapper,
  InfoMain,
  InfoMainUser,
  InfoMainUserInner,
  InfoMainUserName,
  InfoMainUserTime,
  InfoMainContent,
  InfoMainContentInner,
  InfoMainContentInnerText,
} from './style';


export interface IBaseChatMessageInfoProps {
  isSend: boolean;
  chatMessageInfo: {
    id: number,
    avatar: string,
    name: string,
    time: string,
    content: string,
  };
};

const BaseChatMessageInfo = React.memo((props: IBaseChatMessageInfoProps) => {
  return (
    <InfoWrapper>
      <InfoMain>
        <InfoMainUser>
          <InfoMainUserInner isSend={props.isSend}>
            <InfoMainUserName>{props.chatMessageInfo.name}</InfoMainUserName>
            <InfoMainUserTime isSend={props.isSend}>
              {props.chatMessageInfo.time}
            </InfoMainUserTime>
          </InfoMainUserInner>
        </InfoMainUser>
        <InfoMainContent>
          <InfoMainContentInner>
            <InfoMainContentInnerText isSend={props.isSend}>
              {props.chatMessageInfo.content}
            </InfoMainContentInnerText>
          </InfoMainContentInner>
        </InfoMainContent>
      </InfoMain>
    </InfoWrapper>
  );
});

export default BaseChatMessageInfo;