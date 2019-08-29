import * as React from 'react';
import {
  Popover,
  Row,
  Col,
  Button,
  Avatar,
  Spin,
  Divider,
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  AvatarWrapper,
  AvatarNameText,
  AvatarNameBox,
  PopoverTitleContainer,
  PopoverContentContainer,
  PopoverContentMain,
  PopoverTitleMain,
  TitleMainAvatar,
  TitleMainName,
  ContentMainArticleCountBox,
  ContentMainArticleCountText,
  ContentMainArticleCountTip,
  ContentMainFocusedCountBox,
  ContentMainFocusedCountText,
  ContentMainFocusedCountTip,
  ContentMainLikedCountBox,
  ContentMainLikedCountText,
  ContentMainLikedCountTip,
} from './style';
import {
  ICommentListItemProps,
} from '../../BaseCommentItem';
import { query } from 'services/request';


export interface IBaseCommentItemTitleAvatarProps extends ICommentListItemProps, RouteComponentProps { };
export interface IBaseCommentItemTitleAvatarState {
  // ? loading状态
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
      <PopoverTitleContainer>
        <Spin spinning={state.loading}>
          <PopoverTitleMain>
            <TitleMainAvatar>
              <Avatar
                src={state.userProfileInfo.author_avatar}
                icon="user"
                shape="square"
                alt="评论者"
                style={{
                  width: '4.375rem',
                  height: '4.375rem',
                  transform: 'translateY(-1.25rem)',
                }}
              />
            </TitleMainAvatar>
            <TitleMainName>{state.userProfileInfo.author_name}</TitleMainName>
          </PopoverTitleMain>
        </Spin>
      </PopoverTitleContainer>
    );
  }

  /**
   * [初始化] - 头像框 popover content
   */
  function _initAvatarPopoverContent(): JSX.Element {
    return (
      <PopoverContentContainer>
        <Spin spinning={state.loading}>
          <PopoverContentMain>
            <Row>
              <Col span={8}>
                <ContentMainArticleCountBox>
                  <ContentMainArticleCountTip>
                    文章
                </ContentMainArticleCountTip>
                  <ContentMainArticleCountText>
                    {state.userProfileInfo.author_article_total}
                  </ContentMainArticleCountText>
                </ContentMainArticleCountBox>
              </Col>
              <Col span={8}>
                <ContentMainLikedCountBox>
                  <ContentMainLikedCountTip>
                    获赞
                </ContentMainLikedCountTip>
                  <ContentMainLikedCountText>
                    {state.userProfileInfo.author_article_star_total}
                </ContentMainLikedCountText>
                </ContentMainLikedCountBox>
              </Col>
              <Col span={8}>
                <ContentMainFocusedCountBox>
                  <ContentMainFocusedCountTip>
                    关注者
                </ContentMainFocusedCountTip>
                  <ContentMainFocusedCountText>
                    {state.userProfileInfo.author_follower_total}
                  </ContentMainFocusedCountText>
                </ContentMainFocusedCountBox>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button
                  icon="user-add"
                  type="primary"
                  disabled={
                    state.userProfileInfo.user_is_current_author
                      ? true
                      : state.userProfileInfo.user_is_attention
                        ? true
                        : false
                  }
                  onClick={handleAttention}
                >关注他</Button>
              </Col>
              <Col span={12}>
                <Button
                  icon="message"
                  type="ghost"
                  disabled={
                    state.userProfileInfo.user_is_current_author
                      ? true
                      : state.userProfileInfo.user_is_friend
                        ? true
                        : false
                  }
                  onClick={
                    state.userProfileInfo.user_is_friend ? handleChat : handleMakeFriend
                  }
                >
                  {
                    state.userProfileInfo.user_is_friend ? '去聊天' : '加好友'
                  }
                </Button>
              </Col>
            </Row>
          </PopoverContentMain>
        </Spin>
      </PopoverContentContainer>
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

    const { isReply } = props;
    const { _id } = props.commentInfo;

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
   * [处理] - 关注评论人
   */
  function handleAttention(): void {
    const { author_id } = state.userProfileInfo;

    console.log(author_id);

    // serviceHandleCommentUserFollow(
    //   { follower: author_id },
    //   (data) => {
    //     const {
    //       isFollowed,
    //     } = data.info.followInfo;

    //     setState({
    //       ...state,
    //       userInfo: {
    //         ...state.userInfo,
    //         isFollowed,
    //         followersCount: state.userInfo.followersCount + 1,
    //       },
    //     });

    //     // ** tip message **
    //     message.info(`你关注了: ${
    //       state.userInfo.username
    //       }`);
    //   },
    // );
  }

  /**
   * [处理] - 加评论人好友
   */
  function handleMakeFriend() {
    console.log('加好友');
  }

  /**
   * [处理] - 与评论人聊天
   */
  function handleChat() {
    console.log('发起聊天');
  }

  return (
    <AvatarWrapper>
      <Popover
        mouseEnterDelay={.7}
        title={_initAvatarPopoverTitle()}
        content={_initAvatarPopoverContent()}
        onVisibleChange={handleCommentAvatarHover}
      >
        <Avatar
          src={props.commentInfo.from.useravatar}
          icon="user"
          size="default"
          shape="circle"
          alt="评论者"
        />
      </Popover>

      <Divider type="vertical" />

      <AvatarNameBox>
        <AvatarNameText>
          {props.commentInfo.from.username}
        </AvatarNameText>
      </AvatarNameBox>
    </AvatarWrapper>
  );
});


export default withRouter(BaseCommentItemTitleAvatar);