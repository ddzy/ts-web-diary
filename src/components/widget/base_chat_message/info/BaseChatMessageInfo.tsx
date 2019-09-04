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
  InfoMainContentInnerTextImgBox,
  InfoMainContentInnerTextImgContent,
} from './style';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';


export interface IBaseChatMessageInfoProps {
  // ? 辨别是发送方还是接收方
  isSend: boolean;
  // ? 消息具体内容
  chatMessageInfo: {
    id: string,
    avatar: string,
    name: string,
    time: string,
    content: string,
    content_type: IBaseCommonChatMessgaeType,
  };
};

const BaseChatMessageInfo = React.memo((props: IBaseChatMessageInfoProps) => {
  /**
   * [初始化] - 消息内容
   * @description 根据单聊消息的类型, 作不同处理
   */
  function _initMessageContent(): React.ReactNode {
    const {
      content,
      content_type,
    } = props.chatMessageInfo;

    const categoryDesign = {
      // 普通文本
      plain() {
        return content;
      },
      // 图片
      image() {
        const parsedContent: Array<{
          origin: string,
          final: string,
        }> = JSON.parse(content);

        return parsedContent.map((url, index) => {
          return (
            <InfoMainContentInnerTextImgBox key={index}>
              <InfoMainContentInnerTextImgContent
                src={url.origin}
                data-src={url.final}
              />
            </InfoMainContentInnerTextImgBox>
          );
        });
      },
      // TODO
    };

    return categoryDesign[content_type]();
  }

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
        <InfoMainContent isSend={props.isSend}>
          <InfoMainContentInner>
            <InfoMainContentInnerText isSend={props.isSend}>
              {_initMessageContent()}
            </InfoMainContentInnerText>
          </InfoMainContentInner>
        </InfoMainContent>
      </InfoMain>
    </InfoWrapper>
  );
});

export default BaseChatMessageInfo;