import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Spin,
  notification,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';
import BaseCommentItemTitleAvatarContentStatistics from './statistics/BaseCommentItemTitleAvatarContentStatistics';
import BaseCommentItemTitleAvatarContentAction from './action/BaseCommentItemTitleAvatarContentAction';


export interface IBaseCommentItemTitleAvatarContentProps extends RouteComponentProps {
  // ? 获取评论人信息时的loading状态
  isLoading: boolean;
  // ? 评论人的相关信息
  userProfileInfo: {
    author_id: string,
    author_name: string,
    author_avatar: string,
    author_article_total: number,
    author_article_star_total: number,
    author_follower_total: number,
    user_id: string,
    user_name: string,
    user_avatar: string,
    user_is_attention: boolean,
    user_is_friend: boolean,
    user_is_current_author: boolean,
  };
};
export interface IBaseCommentItemTitleAvatarContentState {
  // ? 用户通知的Websocket
  notificationUserIOClient: SocketIOClient.Socket;
};


const BaseCommentItemTitleAvatarContent = React.memo((props: IBaseCommentItemTitleAvatarContentProps) => {
  const [state] = React.useState<IBaseCommentItemTitleAvatarContentState>({
    notificationUserIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user`),
  });

  /**
   * [处理] - 发送加好友请求
   */
  function handleMakeFriendSend(
    data: {
      description: string,
    },
  ) {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const authorId = props.userProfileInfo.author_id;
    const authorName = props.userProfileInfo.author_name;
    const makeFriendDescription = data.description;

    state.notificationUserIOClient.emit('sendMakeFriendRequest', {
      from: userId,
      to: authorId,
      description: makeFriendDescription,
    });

    notification.info({
      message: '提示',
      description: (
        <p>
          <span>已成功向  </span>
          <strong style={{ color: '#1da57a' }}>{authorName}</strong>
          <span>  发起好友请求!</span>
        </p>
      ),
    });
  }

  /**
   * [处理] - 发送关注评论人请求
   */
  function handleAttentionSend() {
    console.log('发起关注');
  }

  /**
   * [处理] - 发送发起聊天会话请求
   */
  function handleChatSend() {
    props.history.push('/chat/interfaces');
  }

  return (
    <Spin spinning={props.isLoading}>
      <ContentWrapper>
        <ContentMain>
          {/* 数值统计区 */}
          <BaseCommentItemTitleAvatarContentStatistics
            userProfileInfo={props.userProfileInfo}
          />

          {/* 附加操作区 */}
          <BaseCommentItemTitleAvatarContentAction
            userProfileInfo={props.userProfileInfo}
            onAttentionSend={handleAttentionSend}
            onMakeFriendSend={handleMakeFriendSend}
            onChatSend={handleChatSend}
          />
        </ContentMain>
      </ContentWrapper>
    </Spin>
  );
});

export default withRouter(BaseCommentItemTitleAvatarContent);