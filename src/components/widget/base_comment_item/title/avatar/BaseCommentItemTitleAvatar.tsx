import * as React from 'react';
import {
  Popover,
  Avatar,
  notification,
  message,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  AvatarWrapper,
  AvatarMain,
} from './style';
import { query } from 'services/request';
import { ICommentListItemProps } from '../../BaseCommentItem';
import {
  notificationUserFriendIOClient,
  notificationUserAttentionPeopleIOClient,
} from 'services/websocket';
import {
  NOTIFICATION_TYPE,
  ACTIVITY_TYPE,
} from 'constants/constants';
import BaseCommentItemTitleAvatarTitle from './title/BaseCommentItemTitleAvatarTitle';
import BaseCommentItemTitleAvatarContent from './content/BaseCommentItemTitleAvatarContent';


export interface IBaseCommentItemTitleAvatarProps extends RouteComponentProps {
  commentInfo: Pick<ICommentListItemProps, 'isAllowAvatarHover' | 'isReply' | 'commentInfo'>;
};
export interface IBaseCommentItemTitleAvatarState {
  // ? 用户加好友通知的Websocket
  notificationUserFriendIOClient: SocketIOClient.Socket;
  // ? 关注用户通知的Websocket
  notificationUserAttentionPeopleIOClient: SocketIOClient.Socket;

  // ? 获取信息时的loading状态
  loading: boolean;
  // ? 用户信息(评论人 & 当前登录用户)
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


const BaseCommentItemTitleAvatar = React.memo<IBaseCommentItemTitleAvatarProps>((
  props: IBaseCommentItemTitleAvatarProps,
): JSX.Element => {

  const [state, setState] = React.useState<IBaseCommentItemTitleAvatarState>({
    notificationUserFriendIOClient,
    notificationUserAttentionPeopleIOClient,
    loading: false,
    userProfileInfo: {
      author_id: '',
      author_name: '',
      author_avatar: '',
      author_article_total: 0,
      author_article_star_total: 0,
      author_follower_total: 0,
      user_id: '',
      user_name: '',
      user_avatar: '',
      user_is_attention: false,
      user_is_friend: false,
      user_is_current_author: false,
    },
  });


  /**
   * [初始化] - 头像框 popover title
   */
  function _initAvatarPopoverTitle(): JSX.Element {
    return (
      <BaseCommentItemTitleAvatarTitle
        isLoading={state.loading}
        userProfileInfo={state.userProfileInfo}
      />
    );
  }

  /**
   * [初始化] - 头像框 popover content
   */
  function _initAvatarPopoverContent(): JSX.Element {
    return (
      <BaseCommentItemTitleAvatarContent
        isLoading={state.loading}
        userProfileInfo={state.userProfileInfo}
        onAttentionSend={handleAttentionSend}
        onChatSend={handleChatSend}
        onMakeFriendSend={handleMakeFriendSend}
      />
    );
  }

  /**
   * [处理] - 评论项头像框hover
   * @description 获取评论or回复人的基本信息
   */
  function handleCommentAvatarHover(
    visible: boolean,
  ): void {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请登录后重试!',
      });

      return props.history.push('/login');
    }

    const { isReply } = props.commentInfo;
    const { _id } = props.commentInfo.commentInfo;

    if (visible) {
      setState({
        ...state,
        loading: true,
      });

      query({
        url: '/api/user/info/article/comment',
        method: 'POST',
        jsonp: false,
        data: {
          userId,
          _id,
          isReply,
        },
      }).then((res) => {
        const { userProfileInfo } = res.data;

        setState({
          ...state,
          userProfileInfo,
        });
      });
    }
  }

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

    const authorId = state.userProfileInfo.author_id;
    const authorName = state.userProfileInfo.author_name;
    const makeFriendDescription = data.description;
    const notificationType = NOTIFICATION_TYPE.user.friend.request;

    state.notificationUserFriendIOClient.emit('sendMakeFriendRequest', {
      from: userId,
      to: authorId,
      description: makeFriendDescription,
      notificationType,
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
    // ? 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const authorId = state.userProfileInfo.author_id;
    const notificationType = NOTIFICATION_TYPE.user.attention.people;
    const activityType = ACTIVITY_TYPE.attention.people;
    const newIsAttention = !state.userProfileInfo.user_is_attention;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/action/attention/people',
      data: {
        isAttention: newIsAttention,
        fromUserId: userId,
        toUserId: authorId,
        activityType,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const attentionInfo = resData.attentionInfo;

        setState({
          ...state,
          userProfileInfo: {
            ...state.userProfileInfo,
            user_is_attention: attentionInfo.isAttention,
            author_follower_total: attentionInfo.isAttention
              ? state.userProfileInfo.author_follower_total + 1
              : state.userProfileInfo.author_follower_total - 1,
          },
        });

      // socket实时通知被关注者
      state.notificationUserAttentionPeopleIOClient.emit('sendUserAttentionPeople', {
          notificationType,
          fromUserId: userId,
          toUserId: authorId,
          isAttention: newIsAttention,
        });

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 发送发起聊天会话请求
   */
  function handleChatSend() {
    props.history.push('/chat/interfaces');
  }

  return (
    <AvatarWrapper>
      <AvatarMain>
        {
          props.commentInfo.isAllowAvatarHover
            ? (
              <Popover
                mouseEnterDelay={.7}
                destroyTooltipOnHide={true}
                title={_initAvatarPopoverTitle()}
                content={_initAvatarPopoverContent()}
                onVisibleChange={handleCommentAvatarHover}
              >
                <Avatar
                  src={props.commentInfo.commentInfo.fromUserInfo.useravatar}
                  icon="user"
                  size="default"
                  shape="circle"
                  alt="评论者"
                />
              </Popover>
            )
            : (
              <Avatar
                src={props.commentInfo.commentInfo.fromUserInfo.useravatar}
                icon="user"
                size="default"
                shape="circle"
                alt="评论者"
              />
            )
        }
      </AvatarMain>
    </AvatarWrapper>
  );
});


export default withRouter(BaseCommentItemTitleAvatar);