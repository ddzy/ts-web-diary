import * as React from 'react';
import {
  Popover,
  Avatar,
  notification,
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
// import {
//   ICommonBaseArticleCommentInfo,
//   ICommonBaseArticleCommentReplyInfo,
// } from 'pages/details/Details.types';
import BaseCommentItemTitleAvatarTitle from './title/BaseCommentItemTitleAvatarTitle';
import BaseCommentItemTitleAvatarContent from './content/BaseCommentItemTitleAvatarContent';
import { ICommentListItemProps } from '../../BaseCommentItem';


export interface IBaseCommentItemTitleAvatarProps extends RouteComponentProps {
  commentInfo: Pick<ICommentListItemProps, 'isAllowAvatarHover' | 'isReply' | 'commentInfo'>;
};
export interface IBaseCommentItemTitleAvatarState {
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