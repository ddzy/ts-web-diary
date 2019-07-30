import * as React from 'react';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import { formatTime } from 'utils/utils';
import BaseChatMessage from 'components/widget/base_chat_message/BaseChatMessage';


export interface IChatInterfacesViewSingleContentProps {
  // ? 单聊消息列表
  singleChatMessage: IStaticChatSingleMessageParams[];
};
// ? 单聊消息格式
export interface IStaticChatSingleMessageParams {
  _id: string;
  chat_id: string;
  from_member_id: {
    _id: string,
    user_id: {
      _id: string,
      useravatar: string,
      username: string,
    },
  },
  to_member_id: {
    _id: string,
    user_id: {
      _id: string,
      useravatar: string,
      username: string,
    },
  },
  content_type: string;
  content: string;
  create_time: number;
  update_time: number;
};

const ChatInterfacesViewSingleContent = React.memo((props: IChatInterfacesViewSingleContentProps) => {
  /**
   * 初始化 - 消息列表
   */
  function _initMessageList() {
    const { singleChatMessage } = props;

    if (singleChatMessage.length) {
      return singleChatMessage.map((v) => {
        // 判断是发送方 or 接收方
        const userId = localStorage.getItem('userid');
        const isSend = v.from_member_id.user_id._id === userId;

        const chatMessageInfo = {
          id: isSend ? v.from_member_id._id : v.to_member_id._id,
          avatar: isSend ? v.from_member_id.user_id.useravatar : v.to_member_id.user_id.useravatar,
          name: isSend ? v.from_member_id.user_id.username : v.to_member_id.user_id.username,
          time: formatTime(v.create_time),
          content: v.content,
        };

        return (
          <ContentMainItem key={v._id}>
            <BaseChatMessage
              isSend={isSend}
              chatMessageInfo = {chatMessageInfo}
            />
          </ContentMainItem>
        );
      });
    }

    return [];
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initMessageList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});

export default ChatInterfacesViewSingleContent;