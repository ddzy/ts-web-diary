import * as React from 'react';
import {
  notification,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
  TitleText,
} from './style';


export interface IChatInterfacesViewSingleTitleProps {
  // ? 单聊信息
  singleChatInfo: {
    from_member_id: {
      _id: string,
      chat_id: string,
      user_id: {
        _id: string,
        username: string,
      },
    },
    to_member_id: {
      _id: string,
      chat_id: string,
      user_id: {
        _id: string,
        username: string,
      },
    },
  },
};

const ChatInterfacesViewSingleTitle = React.memo((props: IChatInterfacesViewSingleTitleProps) => {
  /**
   * 初始化 - 标题单聊接收方名称
   * @description 目前还是采用比对userId的方式来判断是接收方还是发送方
   */
  function _initTitleText(): string {
    const userId = localStorage.getItem('userid');
    const fromUserId = props.singleChatInfo.from_member_id.user_id._id;
    const toUserId = props.singleChatInfo.to_member_id.user_id._id;
    const fromUserName = props.singleChatInfo.from_member_id.user_id.username;
    const toUserName = props.singleChatInfo.to_member_id.user_id.username;

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录',
      });

      return '';
    }

    return userId === fromUserId
      ? toUserName
      : userId === toUserId
        ? fromUserName
        : '';
  }

  return (
    <TitleWrapper>
      <TitleMain>
        <TitleText>
          {_initTitleText()}
        </TitleText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default ChatInterfacesViewSingleTitle;